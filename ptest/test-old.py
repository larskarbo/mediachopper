import aaf2

with aaf2.open("test.aaf", "r") as f:

    # get the main composition
    main_compostion = next(f.content.toplevel())

    # print the name of the composition
    print(main_compostion.name)

    # AAFObjects have properties that can be
    # accessed just like a dictionary
    print(main_compostion['CreationTime'].value)

    # video, audio and other track types are
    # stored in slots on a mob object.
    for slot in main_compostion.slots:
        segment = slot.segment
        print(segment)
        if hasattr(segment, 'slots'):
            for slot in segment.slots:
                segment2 = slot.segment
                print(segment2)