# Generated by Django 3.0.5 on 2020-04-16 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookss', '0004_auto_20200416_1025'),
    ]

    operations = [
        migrations.AddField(
            model_name='books',
            name='member',
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
    ]
