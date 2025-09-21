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
			<header class="cv-header">
				<div class="cv-header__content">
					<h1 class="cv-header__title">{cv.header.name}</h1>
					<h2 class="cv-header__subtitle">{cv.header.title}</h2>
					<div class="cv-contact">
						<p class="cv-contact__item"><a href="mailto:{cv.header.mail}">{cv.header.mail}</a></p>
						<p class="cv-contact__item"><a href="tel:{cv.header.phone}">{cv.header.phone}</a></p>
						<p class="cv-contact__item"><a href="https://maps.google.com/?q={cv.header.address}" target="_blank" rel="noopener noreferrer">{cv.header.address}</a></p>
					</div>
					<div class="cv-about">
						<h3 class="cv-about__title">{m.cv_about()}</h3>
						<p class="cv-about__text">{cv.header.about}</p>
					</div>
				</div>
			</header>

			<section class="cv-section">
				<h2 class="cv-section__title">{m.cv_section_experiences()}</h2>
				{#each cv.experiences as experience (experience.id)}
					<div class="cv-experience">
						<div class="cv-experience__header">
							<h3 class="cv-experience__title">{experience.title}</h3>
							<p class="cv-experience__company">{experience.company}</p>
							<p class="cv-experience__dates">
								{new Date(experience.startDate).toLocaleDateString(dateLocale, { month: 'short', year: 'numeric' })} –
								{experience.endDate ? new Date(experience.endDate).toLocaleDateString(dateLocale, { month: 'short', year: 'numeric' }) : m.cv_present()}
							</p>
						</div>
						<ul class="cv-experience__responsibilities">
							{#each experience.responsibilities as responsibility (responsibility)}
								<li class="cv-experience__responsibility">{responsibility}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</section>

			<section class="cv-section">
				<h2 class="cv-section__title">{m.cv_section_education()}</h2>
				{#each cv.educations as education (education.id)}
					<div class="cv-education">
						<div class="cv-education__header">
							<h3 class="cv-education__grade">{education.grade}</h3>
							<p class="cv-education__school">{education.school}</p>
							<p class="cv-education__dates">
								{education.startDate === education.endDate ? m.cv_obtained_in({ year: new Date(education.endDate).toLocaleDateString(dateLocale, { year: 'numeric' }) }) :
									`${new Date(education.startDate).toLocaleDateString(dateLocale, { year: 'numeric' })} – ${new Date(education.endDate).toLocaleDateString(dateLocale, { year: 'numeric' })}`}
							</p>
						</div>
						{#if education.courses && education.courses.length > 0}
							<ul class="cv-education__courses">
								{#each education.courses as course (course)}
									<li class="cv-education__course">{course}</li>
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
  .cv-page {
    @apply bg-gray-50 p-2 print:p-0 min-h-screen flex justify-center;
  }

  .cv {
    @apply grid grid-cols-[2fr_5fr] auto-rows-min gap-2 bg-white w-full max-w-[210mm] p-4 print:p-2 mx-auto;
  }

  /* Header block */
  .cv-header {
    @apply flex flex-col sm:flex-row items-start mb-4 pb-2 border-b border-blue-100;

		&__content {
			@apply flex-1;
		}

		&__title {
			@apply text-xl font-bold text-gray-900 mb-0.5;
		}

		&__subtitle {
			@apply text-lg font-semibold text-blue-600 mb-2;
		}
  }

  /* Contact block */
  .cv-contact {
    @apply grid grid-cols-1 gap-y-0.5 mb-2 text-sm;

		&__item {
			@apply flex items-baseline;
		}

		&__item strong {
			@apply mr-2 text-gray-600;
		}
  }

  /* About block */
  .cv-about {
    @apply mt-2;

		&__title {
      @apply text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1;
    }

		&__text {
      @apply text-gray-700 text-sm leading-snug;
    }
  }

  /* Section block */
  .cv-section {
    @apply mb-3 min-h-[min-content];

		&__title {
      @apply text-lg font-bold text-gray-900 mb-2 pb-0.5 border-b border-blue-200 uppercase tracking-wider;
    }
  }

  /* Experience block */
  .cv-experience {
    @apply mb-3 pb-2;

		&__header {
      @apply mb-1;
		}

		&__title {
      @apply text-base font-semibold text-gray-900;
		}

		&__company {
      @apply text-gray-600 italic text-sm;
		}

		&__dates {
      @apply text-gray-500 text-xs font-medium;
		}

		&__responsibilities {
      @apply list-disc pl-4 space-y-0.5 text-gray-700 mt-1;
    }

		&__responsibility {
      @apply text-sm marker:text-blue-500;
		}
  }

  /* Education block */
  .cv-education {
    @apply mb-3 pb-2;

		&__header {
      @apply mb-1;
		}

		&__grade {
      @apply text-base font-semibold text-gray-900;
		}

		&__school {
      @apply text-gray-600 italic text-sm;
    }

		&__dates {
      @apply text-gray-500 text-xs font-medium;
		}

		&__courses {
      @apply list-disc pl-4 space-y-0.5 text-gray-700 mt-1;
    }

		&__course {
      @apply text-sm marker:text-blue-500;
		}
  }

  @media print {
    .cv-page {
      @apply p-0;
    }

    .cv {
      @apply p-1 max-w-full;
    }

    .cv-header {
      @apply flex-col items-start;
    }

    .cv-header__photo {
      @apply mb-2;
    }

    body {
      @apply m-0 p-0;
    }
  }
</style>
