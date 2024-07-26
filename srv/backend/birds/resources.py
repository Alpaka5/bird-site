from import_export import resources


class BaseResourceClass(resources.ModelResource):
    class Meta:
        import_id_fields = tuple()
