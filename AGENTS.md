# AGENTS.md — Panduan untuk AI Coding Agents

Dokumen ini adalah panduan khusus untuk **AI coding agents** (seperti Antigravity, GitHub Copilot, dsb.) yang bekerja di dalam repositori **Marchive**. Baca seluruh dokumen ini sebelum melakukan perubahan apapun.

---

## Gambaran Umum Proyek

**Marchive** adalah platform arsip karya tulis personal berbasis web, dibangun dengan:

- **Astro v6** (SSR mode, adapter Vercel) — framework utama
- **TailwindCSS v4** (via `@tailwindcss/vite` plugin)
- **Drizzle ORM** — query builder + migration tool untuk PostgreSQL
- **Neon** — PostgreSQL serverless (database hosting)
- **Cloudinary** — penyimpanan dan upload gambar cover karya
- **jose** — JWT untuk autentikasi admin
- **bcryptjs** — hashing password (tersedia di dependencies)

Proyek ini mendukung dua jenis karya:
- **`book`** — karya berbentuk buku (memiliki bab/chapters)
- **`single`** — karya berdiri sendiri (konten langsung di field `content`)

---

## Struktur Direktori

```
/
├── drizzle/                  # File migrasi SQL yang digenerate drizzle-kit
├── public/                   # Aset statis
├── src/
│   ├── assets/               # Gambar/aset yang diproses Astro
│   ├── components/           # Komponen UI (.astro)
│   │   ├── admin/            # Komponen khusus halaman admin
│   │   │   └── RichTextEditor.astro
│   │   ├── Footer.astro
│   │   ├── GalleryItem.astro
│   │   ├── Hero.astro
│   │   ├── LatestWorks.astro
│   │   ├── Navbar.astro
│   │   └── Preloader.astro
│   ├── data/                 # Data statis (jika ada)
│   ├── db/
│   │   ├── index.ts          # Koneksi database (drizzle instance)
│   │   └── schema/
│   │       ├── index.ts      # Re-export semua schema
│   │       ├── categories.ts # Tabel: categories
│   │       ├── chapters.ts   # Tabel: chapters
│   │       ├── users.ts      # Tabel: users
│   │       └── works.ts      # Tabel: works
│   ├── layouts/              # Layout wrapper Astro
│   ├── lib/
│   │   ├── auth.ts           # JWT: createToken, verifyToken
│   │   └── cloudinary.ts     # Upload gambar ke Cloudinary
│   ├── middleware.ts         # Proteksi route /admin via JWT cookie
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── about.astro       # Halaman about
│   │   ├── categories.astro  # Daftar kategori publik
│   │   ├── login.astro       # Halaman login admin
│   │   ├── works/
│   │   │   ├── index.astro        # Daftar semua karya
│   │   │   ├── [id].astro         # Detail karya (slug/id)
│   │   │   └── [id]/
│   │   │       └── [chapterId].astro  # Halaman baca bab tertentu
│   │   └── admin/
│   │       ├── index.astro        # Dashboard admin
│   │       ├── categories/
│   │       │   ├── index.astro    # Daftar kategori (admin)
│   │       │   ├── new.astro      # Tambah kategori baru
│   │       │   └── [id]/
│   │       │       └── edit.astro # Edit kategori
│   │       └── works/
│   │           ├── index.astro    # Daftar karya (admin)
│   │           ├── new.astro      # Tambah karya baru
│   │           ├── [id].astro     # Detail karya (admin)
│   │           └── [id]/
│   │               ├── edit.astro # Edit karya
│   │               └── chapters/
│   │                   ├── new.astro        # Tambah bab baru
│   │                   └── [chapterId].astro # Edit bab
│   ├── scripts/              # Script TypeScript sisi klien
│   │   ├── hero-slider.ts
│   │   ├── navbar.ts
│   │   └── preloader.ts
│   └── styles/               # File CSS global
├── seed.ts                   # Script seed database
├── drizzle.config.ts         # Konfigurasi drizzle-kit
├── astro.config.mjs          # Konfigurasi Astro
├── package.json
└── tsconfig.json
```

---

## Database Schema

### Tabel `categories`
| Kolom         | Tipe         | Keterangan                     |
|---------------|--------------|--------------------------------|
| `id`          | serial PK    | Auto-increment primary key     |
| `name`        | varchar(255) | Nama kategori                  |
| `slug`        | varchar(255) | URL-friendly, unique           |
| `type`        | varchar(50)  | `'book'` atau `'single'`       |
| `description` | text         | Deskripsi opsional             |
| `created_at`  | timestamp    | Waktu dibuat                   |

### Tabel `works`
| Kolom         | Tipe         | Keterangan                           |
|---------------|--------------|--------------------------------------|
| `id`          | serial PK    | Auto-increment primary key           |
| `title`       | varchar(255) | Judul karya                          |
| `slug`        | varchar(255) | URL-friendly, unique                 |
| `category_id` | integer FK   | FK ke `categories.id` (cascade delete) |
| `type`        | varchar(50)  | `'book'` atau `'single'`             |
| `status`      | varchar(50)  | `'draft'` atau `'published'`         |
| `cover`       | text         | URL gambar cover (dari Cloudinary)   |
| `synopsis`    | text         | Sinopsis/deskripsi karya             |
| `content`     | text         | Konten (khusus tipe `'single'`)      |
| `created_at`  | timestamp    | Waktu dibuat                         |
| `updated_at`  | timestamp    | Waktu diperbarui                     |

### Tabel `chapters`
| Kolom        | Tipe         | Keterangan                         |
|--------------|--------------|------------------------------------|
| `id`         | serial PK    | Auto-increment primary key         |
| `work_id`    | integer FK   | FK ke `works.id` (cascade delete)  |
| `title`      | varchar(255) | Judul bab                          |
| `content`    | text         | Isi bab                            |
| `order`      | integer      | Urutan bab dalam karya             |
| `status`     | varchar(50)  | `'draft'` atau `'published'`       |
| `created_at` | timestamp    | Waktu dibuat                       |
| `updated_at` | timestamp    | Waktu diperbarui                   |

---

## Environment Variables

File `.env` harus berisi variabel berikut:

```env
DATABASE_URL=           # PostgreSQL connection string (Neon)
ADMIN_USERNAME=         # Username login admin
ADMIN_PASSWORD=         # Password login admin (plain, diverifikasi manual)
JWT_SECRET=             # Secret key untuk signing JWT (gunakan string acak panjang)
CLOUDINARY_CLOUD_NAME=  # Nama cloud Cloudinary
CLOUDINARY_API_KEY=     # API Key Cloudinary
CLOUDINARY_API_SECRET=  # API Secret Cloudinary
```

> **JANGAN** pernah commit file `.env` ke repository. File ini sudah ada di `.gitignore`.

---

## Autentikasi & Keamanan

- Sistem autentikasi **hanya untuk satu admin** (single-user). Tidak ada registrasi publik.
- Login menggunakan `ADMIN_USERNAME` dan `ADMIN_PASSWORD` dari environment variable, **bukan** dari database.
- Setelah login berhasil, JWT token ditandatangani dengan `JWT_SECRET` (algoritma HS256) dan disimpan sebagai HTTP cookie bernama `marchive_auth_token`.
- Token berlaku selama **24 jam**.
- **Middleware** (`src/middleware.ts`) memproteksi seluruh route yang dimulai dengan `/admin`. Jika token tidak ada atau tidak valid, pengguna diredirect ke `/login`.

---

## Konvensi Koding

### Umum
- Gunakan **TypeScript** di semua file `.ts` dan `.astro`.
- Hindari `any` type sebisa mungkin; definisikan tipe dengan eksplisit.
- Semua query database menggunakan **Drizzle ORM** — jangan tulis raw SQL secara langsung kecuali benar-benar tidak ada cara lain.

### Database
- Semua perubahan schema **harus** dilakukan melalui file di `src/db/schema/`.
- Setelah mengubah schema, generate migrasi dengan: `npx drizzle-kit generate`
- Jalankan migrasi ke database dengan: `npx drizzle-kit migrate`
- Selalu export entitas baru dari `src/db/schema/index.ts`.
- Gunakan `cascade delete` saat mendefinisikan foreign key agar data tidak orphan.

### Halaman Astro
- Semua halaman adalah **SSR** (server-side rendered) karena Astro dikonfigurasi dengan `output: 'server'`.
- Gunakan `Astro.request` dan `Astro.locals` untuk akses data request.
- Untuk form submission, gunakan method `POST` dan tangani di blok frontmatter halaman yang sama.
- Proteksi halaman admin dilakukan oleh middleware — **jangan** duplikasi logic auth check di setiap halaman admin.

### Komponen
- Komponen UI disimpan di `src/components/`.
- Komponen khusus admin disimpan di `src/components/admin/`.
- Gunakan **TailwindCSS v4** untuk styling. Jangan tambahkan CSS custom kecuali diperlukan.

### Upload Gambar
- Upload gambar selalu melalui `uploadImage()` dari `src/lib/cloudinary.ts`.
- Folder upload default: `'marchive'`. Gunakan sub-folder yang relevan jika diperlukan (misal: `'marchive/covers'`).

---

## Commands Penting

| Command                         | Kegunaan                                          |
|---------------------------------|---------------------------------------------------|
| `pnpm install`                  | Install semua dependencies                        |
| `pnpm dev`                      | Jalankan dev server di `localhost:4321`           |
| `pnpm build`                    | Build untuk production                            |
| `pnpm preview`                  | Preview hasil build                               |
| `npx drizzle-kit generate`      | Generate file migrasi SQL dari perubahan schema   |
| `npx drizzle-kit migrate`       | Jalankan migrasi ke database                      |
| `npx drizzle-kit studio`        | Buka Drizzle Studio (GUI database di browser)     |
| `npx tsx seed.ts`               | Jalankan script seed database                     |

---

## Hal yang TIDAK Boleh Dilakukan

- ❌ Jangan ubah `astro.config.mjs` adapter dari `vercel` tanpa persetujuan eksplisit.
- ❌ Jangan tambahkan sistem registrasi/multi-user tanpa instruksi khusus.
- ❌ Jangan hapus atau ubah struktur tabel yang ada tanpa membuat migrasi baru.
- ❌ Jangan simpan gambar/aset biner langsung di `public/` tanpa alasan kuat — gunakan Cloudinary.
- ❌ Jangan hardcode credentials atau secret di dalam kode sumber.
- ❌ Jangan gunakan `npm` atau `yarn` — proyek ini menggunakan **`pnpm`**.
- ❌ Jangan commit perubahan pada `pnpm-lock.yaml` secara manual.

---

## Deployment

Proyek ini di-deploy ke **Vercel** menggunakan adapter `@astrojs/vercel`. Variabel environment harus dikonfigurasi di dashboard Vercel project settings, **bukan** hanya di file `.env` lokal.

Prefetch diaktifkan dengan strategi `'hover'` untuk semua link guna meningkatkan performa navigasi.

---

## Referensi

- [Astro Documentation](https://docs.astro.build)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Cloudinary Node.js SDK](https://cloudinary.com/documentation/node_integration)
- [Neon Serverless PostgreSQL](https://neon.tech/docs)
- [TailwindCSS v4 Docs](https://tailwindcss.com/docs)
- [jose (JWT library)](https://github.com/panva/jose)
