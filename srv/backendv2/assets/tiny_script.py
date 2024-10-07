import shutil

birds = [
    "aegithalos caudatus",
    "cyanistes caeruleus",
    "erithacus rubecula",
    "oriolus oriolus",
    "periparus ater",
    "regulus regulus",
    "sitta europaea",
]

for bird in birds:
    shutil.copy("images/parus_major.png", f"images/{bird.replace(' ','_')}.png")
    shutil.copy("sounds/parus_major.m4a", f"sounds/{bird.replace(' ', '_')}.m4a")
