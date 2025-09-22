<script lang="ts">
	import type { CV } from '$lib/server/db/schema';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime.js';
	export let cv: CV | null;

	const locale = getLocale();
	const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US';

	function formatDuration(startDate: string, endDate?: string | null): string {
		const start = new Date(startDate);
		const end = endDate ? new Date(endDate) : new Date();

		let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
		if (months < 0) months = 0;

		if (months < 12) {
			return m.cv_duration_month({ months });
		}

		const years = Math.floor(months / 12);
		const remainingMonths = months % 12;

		if (remainingMonths === 0) {
			return m.cv_duration_year({ years });
		}

		// Années + mois
		return m.cv_duration_year_month({ years, months: remainingMonths });
	}

</script>

{#if cv}
	<div class="cv-page">
		<div class="cv">
			<div class="cv__left">
				<header class="cv-header">
					<div class="cv-header__content">
						<div class="cv-picture">
							<img src="/picture-of-me.jpg" alt="Photo de profil" class="cv-picture__image" />
						</div>
						<h1 class="cv-header__title">{cv.header.name}</h1>
						<h2 class="cv-header__subtitle">{cv.header.title}</h2>
						<div class="cv-contact">
							<p class="cv-contact__item"><a href="mailto:{cv.header.mail}">{cv.header.mail}</a></p>
							<p class="cv-contact__item"><a href="tel:{cv.header.phone}">{cv.header.phone}</a></p>
							<p class="cv-contact__item"><a href="https://maps.google.com/?q={cv.header.addressLine1} {cv.header.postalCode} {cv.header.city}" target="_blank" rel="noopener noreferrer">
								{cv.header.addressLine1}, <br />
								{cv.header.postalCode} {cv.header.city}
							</a></p>
						</div>
						<div class="cv-about">
							<h3 class="cv-about__title">{m.cv_about()}</h3>
							<p class="cv-about__text">{cv.header.about}</p>
						</div>
					</div>
				</header>
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
				<section class="cv-section">
					<h2 class="cv-section__title">{m.cv_section_hobbies()}</h2>
					{#each cv.hobbies as hobby (hobby.id)}
						<p class="cv-hobby">
							<span class="cv-hobby__name">
								{hobby.name}
							</span>
							<span class="cv-hobby__description">
								{hobby.description}
							</span>
						</p>
					{/each}
				</section>
			</div>
			<div class="cv__right">
				<section class="cv-section">
					<h2 class="cv-section__title">{m.cv_section_experiences()}</h2>
					{#each cv.experiences as experience (experience.id)}
						<div class="cv-experience">
							<div class="cv-experience__header">
								<h3 class="cv-experience__title">{experience.title}</h3>
								<p class="cv-experience__company">{experience.company}</p>
								<p class="cv-experience__dates">
									{new Date(experience.startDate).toLocaleDateString(dateLocale, { month: 'short', year: 'numeric' })} –
									{experience.endDate ? new Date(experience.endDate).toLocaleDateString(dateLocale, { month: 'short', year: 'numeric' }) : m.cv_present()} &nbsp; {formatDuration(experience.startDate, experience.endDate)}
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
					<h2 class="cv-section__title">{m.cv_section_competences()}</h2>
					{#each cv.competences as competence (competence.id)}
						<p class="cv-competence">
							<span class="cv-competence__name">
								{competence.name}
							</span>
							<span class="cv-competence__description">
								{competence.description}
							</span>
						</p>
					{/each}
				</section>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	%panel {
		@apply flex flex-col gap-4;
	}

	%items {
		@apply flex flex-col gap-1;
	}
  .cv-page {
    @apply bg-gray-50 p-2 print:p-0 min-h-screen flex justify-center;
  }

  .cv {
    @apply flex flex-row flex-wrap gap-5 bg-white w-full max-w-[210mm] p-4 print:p-2 mx-auto;

    &__left {
			@extend %panel;
      @apply flex-2;
    }

    &__right {
      @extend %panel;
      @apply flex-5;
    }
  }

  /* Header block */
  .cv-header {
    @apply sm:flex-row items-start;

		&__content {
      @extend %items;
			@apply flex-1 text-gray-700;
		}

		&__title {
			@apply text-xl font-bold text-gray-900;
		}

		&__subtitle {
			@apply text-lg font-semibold text-blue-600;
		}
  }

	/* Picture block */
	.cv-picture {

		&__image {
			@apply rounded-full w-40 h-40 object-cover;
		}
	}

  /* Contact block */
  .cv-contact {
    @apply grid grid-cols-1 gap-y-0.5 text-sm;

		&__item {
			@apply flex items-baseline;
		}

		&__item strong {
			@apply mr-2 text-gray-600;
		}
  }

  /* About block */
  .cv-about {
		&__title {
      @apply text-sm font-semibold text-gray-700 uppercase tracking-wider;
    }

		&__text {
      @apply text-gray-700 text-sm leading-snug;
    }
  }

  /* Section block */
  .cv-section {
    @extend %items;
    @apply min-h-[min-content];

		&__title {
      @apply text-lg font-bold text-gray-900 border-b border-blue-200 uppercase tracking-wider;
    }
  }

  /* Experience block */
  .cv-experience {

		&__header {
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
      @apply list-disc pl-4 space-y-0.5 text-gray-700;
    }

		&__responsibility {
      @apply text-sm marker:text-blue-500;
		}
  }

  /* Education block */
  .cv-education {

		&__header {
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
      @apply list-disc pl-4 space-y-0.5 text-gray-700;
    }

		&__course {
      @apply text-sm marker:text-blue-500;
		}
  }

	/* Competence block */
	.cv-competence {
		@apply text-sm;

		&__name {
			@apply font-semibold text-gray-900;
		}

		&__description {
			@apply text-gray-700 leading-snug;
		}
	}

  /* Hobby block */
  .cv-hobby {
    @apply text-sm;

    &__name {
      @apply font-semibold text-gray-900;
    }

    &__description {
      @apply text-gray-700 leading-snug;
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
