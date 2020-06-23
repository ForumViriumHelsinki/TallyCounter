from django.contrib.admin.apps import AdminConfig
from django.apps import AppConfig


class TallyCounterConfig(AppConfig):
    name = 'tally_counter'


class AdminConfig(AdminConfig):
    default_site = 'tally_counter.admin_site.AdminSite'
