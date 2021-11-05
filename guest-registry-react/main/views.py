from .models import House, Resident, Guest, query_form_info, query_form_info_guests, query_guest_model_to_get_property_values, GuestLog
from django.shortcuts import redirect, render
from .forms import SearchForm, GuestLogForm
from rest_framework import generics, filters
from .serizalizer import GuestSerializer, HouseSerializer, ResidentSerializer, GuestLogSerializer
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.core.mail import send_mail
from datetime import datetime


# Django Version of the project

def home(request):
    query_results = ''
    query_results_guest = ''
    form = SearchForm()
    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            query_results = query_form_info(request)
            form = SearchForm()
            if not query_results:
                query_results_guest = query_form_info_guests(request)
                form = SearchForm()
    context = {
        'form': form,
        'query_results': query_results,
        'query_results_guest': query_results_guest
    }
    return render(request, 'main/home.html', context)


def guest_log(request, pk):
    form = GuestLogForm(initial={
        'unit': query_guest_model_to_get_property_values(pk).unit,
        'last_name': query_guest_model_to_get_property_values(pk).guest_last_name,
        'first_name': query_guest_model_to_get_property_values(pk).guest_first_name,
        'special_note': query_guest_model_to_get_property_values(pk).special_note
    })
    if request.method == 'POST':
        form = GuestLogForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {'form': form}
    return render(request, 'main/guest_log.html', context)


def house_residents(request, unit):
    residents = Resident.objects.filter(unit=unit)
    context = {
        'residents': residents
    }
    return render(request, 'main/house_residents.html', context)


def guest_list_for_house(request, unit):
    guests = Guest.objects.filter(unit=unit)
    logs = GuestLog.objects.filter(unit=unit)
    context = {
        'guests': guests,
        'logs': logs
    }
    return render(request, 'main/guest_list_for_house.html', context)







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
        
        special_note = request.data['special_note']

        subject = 'Guest allowed to visit your property'
        message = f"""
            Please be advised that on {date_and_time}, {visitor_first_name} {visitor_last_name}
            was allowed into your property. {special_note} Please call us at 0000000000 if you have any questions.
            Thanks
         """
        #for resident in resident_to_notify:
         #   send_mail(subject=subject,
          #            message=message,
           #           from_email=settings.EMAIL_HOST_PASSWORD,
            #          recipient_list=[resident.email])

        return response


class GuestLogAPIListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = GuestLog.objects.all()
    serializer_class = GuestLogSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['$address', '^company', '^plate',
                     '^vehicle', '^last_name', '^first_name']
