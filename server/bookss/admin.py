from django.contrib import admin
from .models import Books


class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'genre', 'isPopular', 'created_on')
    search_fields = ['title', 'genre', 'description']
admin.site.register(Books, BookAdmin)
# Register your models here.
