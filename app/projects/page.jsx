import { redirect } from 'next/navigation';

/** Keep SEO-friendly URLs but land on the SPA section */
export default function ProjectsRedirect() {
  redirect('/#projects');
}
