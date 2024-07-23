from django.db import models


class Language(models.Model):
    code = models.CharField(
        max_length=3,
        primary_key=True,
    )


class BirdOrder(models.Model):
    latin_name = models.CharField(max_length=50, primary_key=True)


class BirdOrderTranslation(models.Model):
    order = models.ForeignKey(BirdOrder, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)


class BirdSuborder(models.Model):
    latin_name = models.CharField(max_length=50, primary_key=True)
    order = models.ForeignKey(BirdOrder, on_delete=models.CASCADE)


class BirdSuborderTranslation(models.Model):
    suborder = models.ForeignKey(BirdSuborder, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)


class BirdFamily(models.Model):
    latin_name = models.CharField(max_length=50, primary_key=True)
    suborder = models.ForeignKey(BirdSuborder, on_delete=models.CASCADE)


class BirdFamilyTranslation(models.Model):
    family = models.ForeignKey(BirdFamily, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)


class Bird(models.Model):
    latin_name = models.CharField(max_length=50, primary_key=True)
    length_min_mm = models.IntegerField()
    length_max_mm = models.IntegerField()
    weight_min_g = models.IntegerField()
    weight_max_g = models.IntegerField()
    family = models.ForeignKey(BirdFamily, on_delete=models.CASCADE)

    def __str__(self):
        return self.latin_name


class BirdSoundsURL(models.Model):
    SONG = "song"
    CALL = "call"
    MIXED = "mixed"
    SOUND_TYPE = {SONG: "song", CALL: "call", MIXED: "mixed"}
    bird = models.ForeignKey(Bird, on_delete=models.CASCADE)
    url = models.CharField(max_length=300)
    type = models.CharField(max_length=100, choices=SOUND_TYPE)


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
