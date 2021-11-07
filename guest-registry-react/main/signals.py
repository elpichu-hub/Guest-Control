from .models import GuestLog
from .views import list_of_emails, residents_to_notify_info
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.core.mail import send_mail


@receiver(post_save, sender=GuestLog)
def create_signal(sender, instance, created, **kwargs):
    if created:
        subject = 'Guest allowed to visit your property'
        
        print(residents_to_notify_info)
        send_mail(subject=subject,
                  message=message,
                  from_email=settings.EMAIL_HOST_USER,
                  recipient_list=list_of_emails)
        print('worked')
