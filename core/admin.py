from django.contrib import admin
from .models import WaitlistEntry

# Register your models here.

@admin.register(WaitlistEntry)
class WaitlistEntry(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email')

admin.site.site_header = "Medical Cert Admin"
admin.site.site_title = "Admin Panel"
admin.site.index_title = "Database Overview"
