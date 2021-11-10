from .models import House, Resident, Guest, GuestLog
from rest_framework import generics, filters
from .serizalizer import GuestSerializer, HouseSerializer, ResidentSerializer, GuestLogSerializer
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.core.mail import send_mail
from datetime import datetime


import threading
import time

# react version


class HouseListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^address']


class ResidentListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Resident.objects.all()
    serializer_class = ResidentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^resident_last_name', '^resident_first_name',
                     '^resident_phone', '$address']


class GuestListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^guest_last_name',
                     '^guest_first_name', '$address_visiting']


class GuestLogAPICreateView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = GuestLog.objects.all()
    serializer_class = GuestLogSerializer

    # in order to send an email when you log 'post' a guest, you need to override the post method like this:

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        residents_to_notify_info = {}
        list_of_emails = []

        residents_to_notify_info.update(
            {'address_to_visit': request.data['address']})
        residents_to_notify_info.update(
            {'visitor_first_name': request.data['first_name']})
        residents_to_notify_info.update(
            {'visitor_last_name': request.data['last_name']})
        residents_to_notify_info.update(
            {'date_and_time': datetime.today().strftime("%m/%d/%Y - %I:%M %p")})
        residents_to_notify_info.update(
            {'special_note': request.data['special_note']})

        resident_to_notify = Resident.objects.filter(
            address__iexact=residents_to_notify_info['address_to_visit'])
        for resident in resident_to_notify:
            # could instead send the email from this loop
            list_of_emails.append(resident.email)

        subject = f"""{residents_to_notify_info['visitor_first_name']} {residents_to_notify_info['visitor_last_name']} Allowed In."""
        message = f"""
           Please be advised that on {residents_to_notify_info['date_and_time']}, {residents_to_notify_info['visitor_first_name']}
            {residents_to_notify_info['visitor_last_name']} was allowed into your property.  Please call us at 0000000000 if you have any questions.
            Thanks
        """

        # put the send_email func inside of this function to be able to call it from the thread
        def send_emails_function_for_thread():
            try:
                send_mail(subject=subject,
                          message=message,
                          from_email=settings.EMAIL_HOST_USER,
                          recipient_list=list_of_emails)
                print('email sent')
            except Exception:
                send_mail(subject='Guest Registry Error',
                          message=Exception,
                          from_email=settings.EMAIL_HOST_USER,
                          recipient_list=[settings.EMAIL_HOST_USER])
                print('Error Report Sent Admin.')

        # this next line of code will create a thread which will send an email after logging a guest. if done traditionally
        # it would affect the ui for about 10 secs, which is a lot of time. This is working fine.
        thread = threading.Thread(target=send_emails_function_for_thread)
        print('before started the thread')
        thread.start()
        print('after starting the thread')
        return response


class GuestLogAPIListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = GuestLog.objects.all()
    serializer_class = GuestLogSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['$address', '^company', '^plate',
                     '^vehicle', '^last_name', '^first_name']
