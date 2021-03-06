# Generated by Django 3.2.4 on 2021-06-24 15:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_guest_house_resident'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='house',
            name='guests',
        ),
        migrations.RemoveField(
            model_name='house',
            name='residents',
        ),
        migrations.AddField(
            model_name='guest',
            name='address_visiting',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='main.house'),
        ),
        migrations.AddField(
            model_name='resident',
            name='address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='main.house'),
        ),
    ]
