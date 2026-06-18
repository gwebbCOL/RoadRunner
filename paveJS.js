let fm = FileManager.iCloud();
let src = fm.documentsDirectory() + "/pavement_assets.txt";
let dst = fm.documentsDirectory() + "/pavement_assets.json";

let raw = fm.readString(src);
let data = JSON.parse(raw); // validates it's real JSON

fm.writeString(dst, JSON.stringify(data));
console.log("pavement_assets.json written");
Script.complete();
