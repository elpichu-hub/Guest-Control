from main.models import Guest, House, Resident, GuestLog
from django.contrib import admin

# Register your models here.


admin.site.register(House)
admin.site.register(Resident)
admin.site.register(Guest)
admin.site.register(GuestLog)


