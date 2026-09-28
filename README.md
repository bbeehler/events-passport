# Event Passport — setup guide

A gamified booth passport for events. Attendees register on their phone, answer a question at each booth,
scan the booth's QR code to collect that exhibitor's logo as a stamp, and climb a live leaderboard.
Admins run everything from `admin.html`, and winners are drawn live on the big-screen page.

## What's in the folder

| File | Who uses it | What it does |
|---|---|---|
| `index.html` | Attendees (phones) | Register, scan booth QR codes, view passport, progress and leaderboard |
| `admin.html` | Your team | Events, booths, logos, QR codes, attendees, winners, admin users |
| `display.html` | Big screen at the event | Live top-10 leaderboard, join QR code, animated prize draw (admin sign-in required to draw) |
| `config.js` | — | Supabase connection (already filled in for the `events-passport` project) |
| `common.js`, `styles.css` | — | Shared code and styling |

The database (Supabase project `events-passport`, Canada Central) is already set up with all tables,
security rules and the `logos` storage bucket.

## 1. Put it online (about 5 minutes)

The pages must be served over **HTTPS** (phone cameras won't open otherwise). Any static host works:

- **Netlify (easiest):** go to app.netlify.com/drop and drag this folder onto the page. You get a URL like
  `https://your-name.netlify.app`. You can rename it or connect a custom domain such as `passport.aiacanada.com`.
- **Your own web server:** upload all files together into one folder.

Keep all files in the same folder — QR codes point to `index.html` beside `admin.html`.

## 2. Point Supabase sign-in emails at your site

In the Supabase dashboard → **Authentication → URL Configuration**:
- **Site URL:** your live admin page, e.g. `https://your-name.netlify.app/admin.html`
- **Redirect URLs:** add the same address.

This makes the "confirm your email" and "reset password" links return to your admin page.

## 3. Create your owner account

Open `admin.html` on your live site → **Create an admin account**. The **first account created becomes the owner**,
so do this straight away. Confirm the email Supabase sends, then sign in.

To add teammates: **Admin users → Invite** their email, then send them the admin page link. They choose
"Create an admin account" with that email. (If they already have an account, access is granted immediately.)

## 4. Set up an event

1. **+ New event** (it starts as "Ready to launch") — name, link name (e.g. `career-expo-2026`), dates, prize, stamps needed to enter the draw, colours and logo.
2. **Booths & QR codes → + Add booth** for each exhibitor. Upload their logo (square PNG with a transparent background looks best) — it becomes the stamp. Add the question staff should ask.
3. **Print QR cards** — one card per booth, 4 per letter page. Give each booth its card.
4. **Print staff sheet** — the list of questions (and backup codes) for booth staff. Keep it out of sight.
5. **Dashboard → Print poster** — the attendee sign-up QR for signage and the welcome desk.

## At the event

- **Booth flow:** staff ask the question → attendee answers → staff reveal the QR card → attendee scans it
  (in the app's **Scan booth code** button or with their normal camera). If a camera fails, staff can read out the code
  printed under the QR, or an admin can award the stamp under **Attendees → Edit**.
- **Big screen:** open `display.html?e=your-link-name` on the screen computer and click **Full screen**. It refreshes every 10 seconds.
- **Prize draw:** on the big screen, hover bottom-right → **Draw winners** → sign in as an admin. Choose the prize, number of winners,
  minimum stamps, whether to skip past winners, and optionally weight the draw by points. Winners are saved under **Winners**.

## After the event

- **Attendees → Export CSV** gives every attendee with contact details, points and a column per booth — ready for exhibitor follow-up.
- Set the event to **Completed** so passports and results stay visible but no more stamps can be collected. Later, **Archive** it to tidy it away.

## Event statuses

Change status from the Dashboard, Event settings, or **All events**.

| Status | Attendees see |
|---|---|
| Ready to launch | "Opening soon" — use this while setting up booths and printing QR codes |
| Live | Full game: sign-up, scanning, leaderboard |
| Paused | Their passport and leaderboard, with a "paused" notice; sign-up and scanning are off |
| Completed | Final results; no new sign-ups or stamps |
| Archived | Nothing — the event is hidden, and it moves out of the admin event list (tick "Show archived" on All events to restore it). Data is kept. |

**Delete** (All events or Event settings) permanently removes an event and everything in it; you'll be asked to type its link name.

**Removing booths:** use **Remove** in the booths table. If attendees already collected that stamp, it's deleted from their passports and their points drop. To keep their points, hide the booth instead (Edit → untick Active).

**Admins:** owners can remove admins and make other people owners. You can't remove or demote yourself — make someone else an owner first.

## Good to know

- **Privacy:** the public leaderboard shows only first name + last initial and school. Full names appear only when announced as a winner.
- **Returning attendees:** entering the same email on another phone reopens the same passport. Anyone who knows an attendee's email
  could open their passport this way — fine for a stamp game, but don't add anything sensitive to it.
- **Security of codes:** each printed QR is a permanent code. If a code leaks (e.g. shared in a group chat), use **Edit → Generate new QR code**
  and reprint that card.
- **Costs:** Supabase handles thousands of attendees on the current plan. Logos are limited to 2 MB each.
