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
    resident_last_name = models.CharField(
        max_length=100, blank=True, null=True)
    resident_first_name = models.CharField(
        max_length=100, blank=True, null=True)
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
    special_note = models.TextField(max_length=100, blank=True, null=True)
    company = models.CharField(max_length=50, blank=True)
    vehicle = models.CharField(max_length=20, default=None)
    plate = models.CharField(max_length=20, default=None)
    time_logged = models.DateTimeField(default=datetime.now, blank=True)
    date_logged = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return f'Guest Log: {self.first_name} {self.last_name} visited address: {self.address}'
