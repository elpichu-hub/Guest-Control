from .models import House, Resident, Guest, GuestLog
from rest_framework import generics, filters
from .serizalizer import GuestSerializer, HouseSerializer, ResidentSerializer, GuestLogSerializer
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.core.mail import send_mail
from datetime import datetime




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


residents_to_notify_info = {}
list_of_emails = []


class GuestLogAPICreateView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = GuestLog.objects.all()
    serializer_class = GuestLogSerializer

    # in order to send an email when you log 'post' a guest, you need to override the post method like this:

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        residents_to_notify_info.update(
            {'address_to_visit': request.data['address']})
        residents_to_notify_info.update(
            {'visitor_first_name': request.data['first_name']})
        residents_to_notify_info.update(
            {'visitor_last_name': request.data['last_name']})
        residents_to_notify_info.update(
            {'date_and_time': datetime.today().strftime("%m/%d/%Y - %I:%M %p")})

        resident_to_notify = Resident.objects.filter(
            address__iexact=residents_to_notify_info['address_to_visit'])

        for resident in resident_to_notify:
            list_of_emails.append(resident.email)

        if request.data['special_note']:
            residents_to_notify_info.update(
                {'special_note': request.data['special_note']})
        else:
            residents_to_notify_info.update({'special_note': ''})

        return response
    

class GuestLogAPIListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = GuestLog.objects.all()
    serializer_class = GuestLogSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['$address', '^company', '^plate',
                     '^vehicle', '^last_name', '^first_name']
