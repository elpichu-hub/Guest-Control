from django.db import models
from datetime import datetime









class House(models.Model):
    address = models.CharField(max_length=100, blank=True)
    owner_last_name = models.CharField(max_length=100, blank=True, null=True)
    owner_first_name = models.CharField(max_length=100, blank=True, null=True)
    emergency_contact = models.CharField(max_length=100, blank=True, null=True)
    owner_phone_number = models.CharField(max_length=20, blank=True, null=True)
    owner_email = models.EmailField(max_length=100, default=None)
    

    def __str__(self):
        return self.address



class Resident(models.Model):
    resident_last_name = models.CharField(max_length=100, blank=True, null=True)
    resident_first_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    resident_phone = models.CharField(max_length=100, blank=True, null=True)
    pin = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    


    def __str__(self):
        return self.resident_last_name


class Guest(models.Model):
    guest_last_name = models.CharField(max_length=100, blank=True, null=True)
    guest_first_name = models.CharField(max_length=100, blank=True, null=True)
    special_note = models.CharField(max_length=100, blank=True, null=True)
    address_visiting = models.CharField(max_length=100)
    
    

    def __str__(self):
        return self.guest_last_name



class GuestLog(models.Model):
    address = models.CharField(max_length=100, default=None)
    last_name = models.CharField(max_length=100, default=None)
    first_name = models.CharField(max_length=100, default=None)
    special_note = models.TextField(max_length=100, blank=True, null=True, default='No Additional Comments')
    company = models.CharField(max_length=50, blank=True)
    vehicle = models.CharField(max_length=20, default=None)
    plate = models.CharField(max_length=20, default=None)
    time_logged = models.DateTimeField(default=datetime.now, blank=True)
    date_logged = models.DateTimeField(default=datetime.now, blank=True)
    

    

    def __str__(self):
        return f'Guest Log: {self.first_name} {self.last_name} visited address: {self.address}'



def query_form_info(request):
    if request.POST.get('unit'):
        query_resident_model_by_unit = Resident.objects.filter(unit__startswith=request.POST.get('unit'))
        return query_resident_model_by_unit

    if request.POST.get('resident_last_name'):
        query_resident_model_by_resident_last_name = Resident.objects.filter(resident_last_name__startswith=request.POST.get('resident_last_name'))
        return query_resident_model_by_resident_last_name

    if request.POST.get('address'):
        query_house_model_by_address = House.objects.filter(address__startswith=request.POST.get('address'))

        residents_for_house = ''                            ### quering the Resident Model with the query_house_model_by_address results ###
        for query in query_house_model_by_address:
            residents_for_house = Resident.objects.filter(unit__startswith=query.unit)
        return residents_for_house

    if request.POST.get('resident_phone'):
        query_resident_model_by_phone = Resident.objects.filter(resident_phone__startswith=request.POST.get('resident_phone'))
        return query_resident_model_by_phone
        

def query_form_info_guests(request):
    if request.POST.get('guest'):
        query_guest_model_by_guest_last_name = Guest.objects.filter(guest_last_name__startswith=request.POST.get('guest'))
        return query_guest_model_by_guest_last_name
    




def query_guest_model_to_get_property_values(pk):     #### retrieving guest query properties to fill in form when selecting an entry of guest.
    query = Guest.objects.filter(pk=pk)
    for a in query:
        print(a)
    return a




    
        

