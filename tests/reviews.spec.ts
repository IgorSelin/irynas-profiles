import { test, expect } from '@playwright/test';

test.describe('Reviews functionality', () => {
  test('should show only 10 reviews on home page and have a link to all reviews', async ({ page }) => {
    // Go to home page
    await page.goto('/');

    // Scroll to reviews section to ensure it's loaded if lazy
    const reviewsSection = page.locator('#reviews');
    await reviewsSection.scrollIntoViewIfNeeded();

    // Count review cards
    // Using a more specific selector based on the structure in Reviews.tsx/ReviewCard.tsx
    // The cards are within a grid in the reviews section
    const reviewCards = page.locator('#reviews .grid > div:not(.col-span-2)');
    
    // Wait for the reviews to be loaded (they might be loaded from staticReviews immediately)
    await expect(reviewCards).toHaveCount(10);

    // Check for "Show all" button
    const showAllButton = page.getByRole('link', { name: 'Переглянути всі відгуки' });
    await expect(showAllButton).toBeVisible();

    // Click "Show all" and verify redirection
    await showAllButton.click();
    await expect(page).toHaveURL(/\/reviews/);

    // Verify more reviews are shown on the full reviews page
    const allReviewCards = page.locator('#reviews .grid > div:not(.col-span-2)');
    const count = await allReviewCards.count();
    expect(count).toBeGreaterThan(10);
  });
});
