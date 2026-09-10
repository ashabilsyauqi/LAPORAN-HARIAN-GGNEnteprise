const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'kos_data.js');
let code = fs.readFileSync(filePath, 'utf8');

const photoBank = [
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
];

// Load and evaluate
const context = {};
const fn = new Function('context', code + '\ncontext.INITIAL_KOS_DATA = INITIAL_KOS_DATA;');
fn(context);

const data = context.INITIAL_KOS_DATA;

data.forEach((item, i) => {
  if (!item.images) item.images = [];
  let offset = 0;
  while (item.images.length < 6) {
    const candidate = photoBank[(i * 3 + offset) % photoBank.length];
    if (!item.images.includes(candidate)) {
      item.images.push(candidate);
    }
    offset++;
    if (offset > 30) break;
  }
});

const newContent = `/**
 * DATASET KOS-KOSAN INDONESIA (CariKos Web App)
 * Berisi listing realistis di kota-kota besar & dekat kampus terkemuka (Masing-masing 6+ Foto HD).
 */

const INITIAL_KOS_DATA = ${JSON.stringify(data, null, 2)};
`;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Success: All ${data.length} kos properties now have 6+ photos.`);
