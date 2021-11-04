# Generated by Django 3.2.4 on 2021-06-28 03:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_rename_phone_resident_resident_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='GuestLogModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit', models.CharField(max_length=20)),
                ('last_name', models.CharField(max_length=100)),
                ('first_name', models.CharField(max_length=100)),
                ('special_note', models.CharField(blank=True, max_length=100, null=True)),
                ('company', models.CharField(max_length=50)),
                ('vehicle', models.CharField(max_length=20)),
                ('plate', models.CharField(max_length=20)),
                ('time_logged', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
    ]