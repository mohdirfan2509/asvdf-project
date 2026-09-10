-- ASVDF CMS schema — run in Supabase SQL editor
-- Enables structured content + admin-only writes

create extension if not exists "pgcrypto";

-- Site settings (single row)
create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  company_name text not null default 'ASVDF Flooring',
  phone text not null default '9063222804',
  whatsapp text not null default '919063222804',
  email text default 'info@asvdf.com',
  address text default '',
  seo_title text default 'ASVDF Flooring | Premium VDF Flooring Solutions',
  seo_description text default 'High-performance VDF and industrial flooring solutions. Built for durability. Designed to last.',
  seo_keywords text default 'VDF flooring, industrial flooring, ASVDF, vacuum dewatered flooring',
  hero_badge text default 'PREMIUM FLOORING SOLUTIONS',
  hero_heading_1 text default 'Stronger Floors.',
  hero_heading_2 text default 'Stronger ',
  hero_highlight text default 'Foundations.',
  hero_subtext text default 'High-performance flooring solutions for industrial, commercial and infrastructure projects.',
  hero_image text default '/banner.png',
  cta_primary text default 'Explore Our Services',
  cta_secondary text default 'View Our Projects',
  updated_at timestamptz default now()
);

insert into site_settings (id) values (1) on conflict (id) do nothing;

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Industrial',
  location text default '',
  area text default '',
  image text default '',
  featured boolean default false,
  published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  image text default '',
  category text default 'All Services',
  featured boolean default false,
  published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo text default '',
  industry text default '',
  featured boolean default false,
  published boolean default true,
  sort_order int default 0
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text default '',
  quote text not null,
  avatar text default '',
  rating int default 5,
  featured boolean default false,
  published boolean default true,
  sort_order int default 0
);

create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text default '',
  body text default '',
  cover text default '',
  category text default 'General',
  seo_title text default '',
  seo_description text default '',
  featured boolean default false,
  published boolean default true,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text default '',
  image text not null,
  category text default 'All Projects',
  featured boolean default false,
  published boolean default true,
  sort_order int default 0
);

create table if not exists machinery (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specs text default '',
  image text default '',
  featured boolean default false,
  published boolean default true,
  sort_order int default 0
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text default 'All Questions',
  featured boolean default false,
  published boolean default true,
  sort_order int default 0
);

create table if not exists milestones (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title text not null,
  description text default '',
  published boolean default true,
  sort_order int default 0
);

create table if not exists core_values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  icon text default 'shield',
  published boolean default true,
  sort_order int default 0
);

create table if not exists about_content (
  id int primary key default 1 check (id = 1),
  headline text default 'About ASVDF Flooring',
  body text default '',
  image text default '',
  updated_at timestamptz default now()
);

insert into about_content (id) values (1) on conflict (id) do nothing;

create table if not exists page_sections (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  enabled boolean default true,
  sort_order int default 0
);

insert into page_sections (key, label, sort_order) values
  ('home', 'Home', 0),
  ('projects', 'Projects', 1),
  ('clients', 'Clients', 2),
  ('services', 'Services', 3),
  ('about', 'About Us', 4),
  ('milestones', 'Milestones', 5),
  ('values', 'Core Values', 6),
  ('contact', 'Contact Us', 7),
  ('contact_form', 'Contact Form', 8),
  ('testimonials', 'Testimonials', 9),
  ('blogs', 'Blogs', 10),
  ('machinery', 'Machinery', 11),
  ('gallery', 'Gallery', 12),
  ('faqs', 'FAQs', 13),
  ('footer', 'Footer', 14)
on conflict (key) do nothing;

-- Storage bucket for CMS images (create via dashboard or):
-- insert into storage.buckets (id, name, public) values ('media', 'media', true);

-- RLS: public read published; writes for authenticated only
alter table site_settings enable row level security;
alter table projects enable row level security;
alter table services enable row level security;
alter table clients enable row level security;
alter table testimonials enable row level security;
alter table blogs enable row level security;
alter table gallery_images enable row level security;
alter table machinery enable row level security;
alter table faqs enable row level security;
alter table milestones enable row level security;
alter table core_values enable row level security;
alter table about_content enable row level security;
alter table page_sections enable row level security;

create policy "Public read site_settings" on site_settings for select using (true);
create policy "Auth write site_settings" on site_settings for all using (auth.role() = 'authenticated');

create policy "Public read published projects" on projects for select using (published = true or auth.role() = 'authenticated');
create policy "Auth write projects" on projects for all using (auth.role() = 'authenticated');

create policy "Public read published services" on services for select using (published = true or auth.role() = 'authenticated');
create policy "Auth write services" on services for all using (auth.role() = 'authenticated');

create policy "Public read published clients" on clients for select using (published = true or auth.role() = 'authenticated');
create policy "Auth write clients" on clients for all using (auth.role() = 'authenticated');

create policy "Public read published testimonials" on testimonials for select using (published = true or auth.role() = 'authenticated');
create policy "Auth write testimonials" on testimonials for all using (auth.role() = 'authenticated');

create policy "Public read published blogs" on blogs for select using (published = true or auth.role() = 'authenticated');
create policy "Auth write blogs" on blogs for all using (auth.role() = 'authenticated');

create policy "Public read published gallery" on gallery_images for select using (published = true or auth.role() = 'authenticated');
create policy "Auth write gallery" on gallery_images for all using (auth.role() = 'authenticated');

create policy "Public read published machinery" on machinery for select using (published = true or auth.role() = 'authenticated');
create policy "Auth write machinery" on machinery for all using (auth.role() = 'authenticated');

create policy "Public read published faqs" on faqs for select using (published = true or auth.role() = 'authenticated');
create policy "Auth write faqs" on faqs for all using (auth.role() = 'authenticated');

create policy "Public read published milestones" on milestones for select using (published = true or auth.role() = 'authenticated');
create policy "Auth write milestones" on milestones for all using (auth.role() = 'authenticated');

create policy "Public read published values" on core_values for select using (published = true or auth.role() = 'authenticated');
create policy "Auth write values" on core_values for all using (auth.role() = 'authenticated');

create policy "Public read about" on about_content for select using (true);
create policy "Auth write about" on about_content for all using (auth.role() = 'authenticated');

create policy "Public read sections" on page_sections for select using (true);
create policy "Auth write sections" on page_sections for all using (auth.role() = 'authenticated');

-- Migration: add featured columns if upgrading an older schema
alter table services add column if not exists featured boolean default false;
alter table clients add column if not exists featured boolean default false;
alter table testimonials add column if not exists featured boolean default false;
alter table blogs add column if not exists featured boolean default false;
alter table gallery_images add column if not exists featured boolean default false;
alter table machinery add column if not exists featured boolean default false;
alter table faqs add column if not exists featured boolean default false;
alter table projects add column if not exists featured boolean default false;
