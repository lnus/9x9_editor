# This is stupid and will be remade in the future
# https://github.com/PrismarineJS/minecraft-assets/blob/master/data/1.20.2/blocks_textures.json
# Get all info from this ^
# Then filter out only the name, prepend "minecraft:" to it, and put it in a list
# Then export this list as a json file

import json
import requests

url = "https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.20.2/blocks_textures.json"

response = requests.get(url)
data = response.json()

block_ids = ["minecraft:" + block["name"] for block in data]

# Write this to block_ids.json
with open("block_ids.json", "w") as f:
    json.dump(block_ids, f, indent=4)
