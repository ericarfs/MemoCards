# Generated by Django 5.1.1 on 2024-09-10 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_flashcard_example'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flashcard',
            name='example',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]