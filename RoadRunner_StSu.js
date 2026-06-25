// Variables used by Scriptable. Updated 6-25-26
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;

const THRESHOLD_M = 25;
const BBOX_M = 60;

// ── 0. Ask user for asset type ──────────────────────────────
var asset = args.shortcutParameter;
//var asset = args.plainTexts[0];


// ── 1. Get current location ─────────────────────────────────
Location.setAccuracyToBest();
const loc = await Location.current();
const currentLat = loc.latitude;
const currentLon = loc.longitude;
// const currentLat = 46.419452;
// const currentLon = -117.020874;

// ── 2. Convert WGS84 → Web Mercator ────────────────────────
const R = 6378137.0;
const currentX = currentLon * (Math.PI / 180) * R;
const currentY = Math.log(Math.tan((Math.PI / 4) + (currentLat * Math.PI / 360))) * R;

// ── 3. Load JSON file ───────────────────────────────────────
var fm = FileManager.iCloud();
var path;
if (asset === "Pavement") {
  var path = fm.documentsDirectory() + "/pavement_assets.json";
} else if (asset === "Support") {
  var path = fm.documentsDirectory() + "/support_assets.json";
}

await fm.downloadFileFromiCloud(path);
var raw = fm.readString(path);
var points = JSON.parse(raw);

// ── 4. Bounding box pre-filter ──────────────────────────────
var candidates = points.filter(function(p) {
  return Math.abs(p.POINT_X - currentX) < BBOX_M &&
         Math.abs(p.POINT_Y - currentY) < BBOX_M;
});


// ── 5. Exact distance check ─────────────────────────────────
var matches = [];
for (var i = 0; i < candidates.length; i++) {
  var dx = candidates[i].POINT_X - currentX;
  var dy = candidates[i].POINT_Y - currentY;
  var dist = Math.sqrt(dx * dx + dy * dy);
  if (dist <= THRESHOLD_M) {
    matches.push({"CartegraphID":candidates[i].CartegraphID,"Distance":dist});
  }
}

// ── 6. Get the closest match ────────────────────────────────
var match = null;
shortValue = 1000
// ── 6. Get the closest match
if (matches.length > 0) {
  for (const x of matches) {
    if (x.Distance < shortValue) {
      shortValue = x.Distance
      match = x;
    }
  }
}


// ── 6. Output result ────────────────────────────────────────
var result = match ? match.CartegraphID : "NO_MATCH";
Script.setShortcutOutput(result);
Script.complete();
