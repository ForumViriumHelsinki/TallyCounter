from django.contrib import admin

from . import models


@admin.register(models.TallySubject)
class TallySubjectAdmin(admin.ModelAdmin):
    pass


@admin.register(models.TallyCount)
class TallyCountAdmin(admin.ModelAdmin):
    list_filter = ['subject']
    list_display = ['subject', 'timestamp', 'count']
    date_hierarchy = 'timestamp'
