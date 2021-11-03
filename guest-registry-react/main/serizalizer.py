from rest_framework import serializers
from .models import House, Resident, Guest, GuestLog




class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = [
            'address', 'owner_last_name',
            'owner_first_name', 'emergency_contact',
            'owner_phone_number'

        ]

class ResidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resident
        fields = [
            'resident_last_name', 'resident_first_name',
            'resident_phone', 'pin', 'address', 'email'
        ]



class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ['guest_last_name', 'guest_first_name', 'special_note', 'address_visiting']


class GuestLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestLog
        fields = [
            'address', 'first_name', 'last_name', 'special_note', 'company',
            'vehicle', 'plate', 'time_logged', 'date_logged',
        ]

    