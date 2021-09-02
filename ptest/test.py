import opentimelineio as otio

timeline = otio.adapters.read_from_file("test.aaf")
for clip in timeline.each_clip():
  print(clip.name, clip.duration())