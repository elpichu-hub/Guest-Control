from .models import GuestLog
from django import forms



class SearchForm(forms.Form):
    unit = forms.CharField(max_length=100, required=False)
    resident_last_name = forms.CharField(max_length=100, required=False)
    address = forms.CharField(max_length=100, required=False)
    resident_phone = forms.CharField(max_length=100, required=False)
    guest = forms.CharField(max_length=100, required=False)


  


class GuestLogForm(forms.ModelForm):
    unit = forms.CharField(max_length=20)
    last_name = forms.CharField(max_length=100)
    first_name = forms.CharField(max_length=100)
    special_note = forms.CharField(max_length=100, required=False)
    company = forms.CharField(max_length=20, required=False)
    vehicle = forms.CharField(max_length=20)
    plate = forms.CharField(max_length=20)
    

    class Meta:
        model = GuestLog
        fields = ['unit', 'last_name', 'first_name', 'special_note', 'company', 'vehicle', 'plate']

   