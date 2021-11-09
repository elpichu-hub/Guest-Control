from .models import House, Resident, Guest, GuestLog
from rest_framework import generics, filters
from .serizalizer import GuestSerializer, HouseSerializer, ResidentSerializer, GuestLogSerializer
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.core.mail import send_mail
from datetime import datetime



####react version

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

        address_to_visit = request.data['address']
        visitor_first_name = request.data['first_name']
        visitor_last_name = request.data['last_name']
        date_and_time = datetime.today().strftime("%m/%d/%Y - %I:%M %p")
        resident_to_notify = Resident.objects.filter(
            address__iexact=address_to_visit)
        
        if request.data['special_note']:
            special_note = request.data['special_note']
        else:
            special_note = ''
        subject = 'Guest allowed to visit your property'
        message = f"""
            Please be advised that on {date_and_time}, {visitor_first_name} {visitor_last_name}
            was allowed into your property. {special_note} Please call us at 0000000000 if you have any questions.
            Thanks
         """
        #for resident in resident_to_notify:
        #    send_mail(subject=subject,
        #              message=message,
        #              from_email=settings.EMAIL_HOST_PASSWORD,
        #              recipient_list=[resident.email])

        return response


class GuestLogAPIListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = GuestLog.objects.all()
    serializer_class = GuestLogSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['$address', '^company', '^plate',
                     '^vehicle', '^last_name', '^first_name']



