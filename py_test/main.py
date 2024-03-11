import json
import base64
import gzip
import io
from nbtlib import File  # Good class


# Tiny reimplementation of nbtlib.load, but using bytes rather than a temporary file
# Still requires the nbtlib.File class.
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
    nbtfile = load_from_bytes(decoded, gzipped=True)

    # Print the NBT data
    for tag in nbtfile["data"]:
        print(tag)
