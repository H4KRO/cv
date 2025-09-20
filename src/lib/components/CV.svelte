<script lang="ts">
	import type { CV } from '$lib/server/db/schema';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime.js';
	export let cv: CV | null;

	const locale = getLocale();
	const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US';
</script>

{#if cv}
	<div class="cv-page">
		<div class="cv">
			<!-- En-tête -->
			<header class="cv__header">
				<div class="cv__photo-placeholder"></div>
				<div class="cv__header-content">
					<h1 class="cv__header-title">{cv.header.name}</h1>
					<h2 class="cv__header-subtitle">{cv.header.title}</h2>
					<div class="cv__contact">
						<p class="cv__contact-item"><strong>{m.cv_email()}</strong>: {cv.header.mail}</p>
						<p class="cv__contact-item"><strong>{m.cv_phone()}</strong>: {cv.header.phone}</p>
						<p class="cv__contact-item"><strong>{m.cv_address()}</strong>: {cv.header.address}</p>
					</div>
					<div class="cv__about">
						<h3 class="cv__about-title">{m.cv_about()}</h3>
						<p class="cv__about-text">{cv.header.about}</p>
					</div>
				</div>
			</header>

			<!-- Expériences -->
			<section class="cv__section">
				<h2 class="cv__section-title">{m.cv_section_experiences()}</h2>
				{#each cv.experiences as experience (experience.id)}
					<div class="cv__experience">
						<div class="cv__experience-header">
							<h3 class="cv__experience-title">{experience.title}</h3>
							<p class="cv__experience-company">{experience.company}</p>
							<p class="cv__experience-dates">
								{new Date(experience.startDate).toLocaleDateString(dateLocale, { month: 'short', year: 'numeric' })} –
								{experience.endDate ? new Date(experience.endDate).toLocaleDateString(dateLocale, { month: 'short', year: 'numeric' }) : m.cv_present()}
							</p>
						</div>
						<ul class="cv__experience-responsibilities">
							{#each experience.responsibilities as responsibility (responsibility)}
								<li class="cv__experience-responsibility">{responsibility}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</section>

			<!-- Formations -->
			<section class="cv__section">
				<h2 class="cv__section-title">{m.cv_section_education()}</h2>
				{#each cv.educations as education (education.id)}
					<div class="cv__education">
						<div class="cv__education-header">
							<h3 class="cv__education-grade">{education.grade}</h3>
							<p class="cv__education-school">{education.school}</p>
							<p class="cv__education-dates">
								{education.startDate === education.endDate ? m.cv_obtained_in({ year: new Date(education.endDate).toLocaleDateString(dateLocale, { year: 'numeric' }) }) :
									`${new Date(education.startDate).toLocaleDateString(dateLocale, { year: 'numeric' })} – ${new Date(education.endDate).toLocaleDateString(dateLocale, { year: 'numeric' })}`}
							</p>
						</div>
						{#if education.courses && education.courses.length > 0}
							<ul class="cv__education-courses">
								{#each education.courses as course (course)}
									<li class="cv__education-course">{course}</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</section>
		</div>
	</div>
{/if}

<style lang="scss">
  /* Polices et réinitialisation */
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');

  .cv-page {
    @apply bg-gray-50 p-2 print:p-0 min-h-screen flex justify-center;
    font-family: 'Open Sans', sans-serif;
  }

  .cv {
    @apply bg-white w-full max-w-[210mm] p-4 print:p-2 mx-auto;
    box-sizing: border-box;

    &__header {
      @apply flex flex-col sm:flex-row items-start mb-4 pb-2 border-b border-blue-100;
    }

    &__photo-placeholder {
      @apply w-20 h-20 rounded-full bg-blue-100 mr-4 mb-2 sm:mb-0 flex-shrink-0;
    }

    &__header-content {
      @apply flex-1;
    }

    &__header-title {
      @apply text-xl font-bold text-gray-900 mb-0.5;
    }

    &__header-subtitle {
      @apply text-lg font-semibold text-blue-600 mb-2;
    }

    &__contact {
      @apply grid grid-cols-1 gap-y-0.5 mb-2 text-sm;
    }

    &__contact-item {
      @apply flex items-baseline;

      strong {
        @apply mr-2 text-gray-600;
      }
    }

    &__about {
      @apply mt-2;
    }

    &__about-title {
      @apply text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1;
    }

    &__about-text {
      @apply text-gray-700 text-sm leading-snug;
    }

    &__section {
      @apply mb-3;
    }

    &__section-title {
      @apply text-lg font-bold text-gray-900 mb-2 pb-0.5 border-b border-blue-200 uppercase tracking-wider;
    }

    &__experience {
      @apply mb-3 pb-2;
    }

    &__experience-header {
      @apply mb-1;
    }

    &__experience-title {
      @apply text-base font-semibold text-gray-900;
    }

    &__experience-company {
      @apply text-gray-600 italic text-sm;
    }

    &__experience-dates {
      @apply text-gray-500 text-xs font-medium;
    }

    &__experience-responsibilities {
      @apply list-disc pl-4 space-y-0.5 text-gray-700 mt-1;
    }

    &__experience-responsibility {
      @apply text-sm marker:text-blue-500;
    }

    &__education {
      @apply mb-3 pb-2;
    }

    &__education-header {
      @apply mb-1;
    }

    &__education-grade {
      @apply text-base font-semibold text-gray-900;
    }

    &__education-school {
      @apply text-gray-600 italic text-sm;
    }

    &__education-dates {
      @apply text-gray-500 text-xs font-medium;
    }

    &__education-courses {
      @apply list-disc pl-4 space-y-0.5 text-gray-700 mt-1;
    }

    &__education-course {
      @apply text-sm marker:text-blue-500;
    }
  }

  /* Impression */
  @media print {
    .cv-page {
      @apply p-0;
    }

    .cv {
      @apply p-1 max-w-full;

      &__header {
        @apply flex-col items-start;
      }

      &__photo-placeholder {
        @apply mb-2;
      }
    }

    body {
      @apply m-0 p-0;
    }
  }
</style>
