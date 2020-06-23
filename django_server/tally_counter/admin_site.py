from django.contrib import admin


class AdminSite(admin.AdminSite):
    site_header = 'Tally Counter Admin'
    site_title = 'Tally Counter Admin'
    site_url = None
