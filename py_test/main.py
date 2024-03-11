import json
import base64
import nbtlib
import gzip
import io
from nbtlib import File  # Good class

# TODO Do rewrite of the code within File.from_fileobj


# Attempted rewrite of nbtlib's code.
def load_from_bytes(byte_data, *, gzipped=None, byteorder="big"):
    """Load NBT data from a bytes object.

    Arguments:
        byte_data: The NBT data as a bytes object.
        gzipped: Whether the data is gzipped or not.
        byteorder: The byte order, 'big' or 'little'.
    """

    if gzipped is None:
        gzipped = byte_data[:2] == b"\x1f\x8b"

    if gzipped:
        # If the data is GZip compressed, extract the compressed data
        fileobj = gzip.GzipFile(fileobj=io.BytesIO(byte_data))
    else:
        fileobj = io.BytesIO(byte_data)

    # Load the NBT data from the file-like object
    return File.from_fileobj(fileobj, byteorder=byteorder)


with open("2.1.0.json") as f:
    data = json.load(f)
    header = data["header"]  # Kinda unused

    # This contains all the actual build information
    body = data["body"]  # For 2.1.0, this contains Base64 encoded NBT data

    # Decode the Base64 data and print it (Should be GZip compressed)
    decoded = base64.b64decode(body)

    # Use nbtlib to parse the NBT data
    # nbt.load only accepts file-like objects, so write a temporary file.
    # There has to be a better way to do this, but I'm not cooking right now.
    with open("temp.nbt", "wb") as f:
        f.write(decoded)

    with nbtlib.load("temp.nbt", gzipped=True) as nbtfile:
        # Iterate over the "tags"
        for tag in nbtfile["data"]:
            state = tag["state"]
            block_id = state["Name"]
            print(block_id)
            print(state)
