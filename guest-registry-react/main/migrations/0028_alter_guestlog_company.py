# Generated by Django 3.2.4 on 2021-10-13 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0027_auto_20211013_1605'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guestlog',
            name='company',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]