from .models import GuestLog
from .views import list_of_emails, residents_to_notify_info
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.core.mail import send_mail


@receiver(post_save, sender=GuestLog)
def create_signal(sender, instance, created, **kwargs):
    if created:
        
        
        new_log = GuestLog.objects.last()
        
        print(new_log)
