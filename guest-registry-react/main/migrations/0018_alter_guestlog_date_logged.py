# Generated by Django 3.2.4 on 2021-06-29 16:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_guestlog_date_logged'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guestlog',
            name='date_logged',
            field=models.DateTimeField(default=datetime.date.today),
        ),
    ]