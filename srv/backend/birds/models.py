from django.db import models


class BirdOrder(models.Model):
    name = models.CharField(max_length=50, primary_key=True)


class BirdSuborder(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    order = models.ForeignKey(BirdOrder, on_delete=models.CASCADE)


class BirdFamily(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    suborder = models.ForeignKey(BirdSuborder, on_delete=models.CASCADE)


class Bird(models.Model):
    latin_name = models.CharField(max_length=50, unique=True)
    length_mm = models.IntegerField()
    weight_g = models.IntegerField()
    family = models.ForeignKey(BirdFamily, on_delete=models.CASCADE)

    def __str__(self):
        return self.latin_name


class Language(models.Model):
    code = models.CharField(
        max_length=3,
        primary_key=True,
    )


class BirdTextField(models.Model):
    bird = models.ForeignKey(Bird, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    description = models.TextField()


class BirdNameTranslation(models.Model):
    bird = models.ForeignKey(Bird, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)


class BirdTag(models.Model):
    bird = models.ForeignKey(Bird, on_delete=models.CASCADE)
    tag = models.CharField(max_length=32)
