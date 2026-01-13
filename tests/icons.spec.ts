import { test, expect } from '@playwright/test';

test.describe('Icons and Favicon', () => {
  test('should have favicon.ico accessible (for Google)', async ({ page, request }) => {
    const response = await request.get('/favicon.ico');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image');
  });

  test('should have icon accessible', async ({ page, request }) => {
    const response = await request.get('/icon');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('should have icon.svg accessible', async ({ page, request }) => {
    const response = await request.get('/icon.svg');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/svg');
  });

  test('should have apple-icon accessible', async ({ page, request }) => {
    const response = await request.get('/apple-icon');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('should have correct icon links in HTML head', async ({ page }) => {
    await page.goto('/');
    
    // Перевіряємо, що іконки присутні в HTML
    const faviconLink = await page.locator('link[rel="icon"]').first();
    await expect(faviconLink).toBeVisible();
    
    const appleIconLink = await page.locator('link[rel="apple-touch-icon"]');
    await expect(appleIconLink).toBeVisible();
  });

  test('should have correct icon metadata', async ({ page }) => {
    await page.goto('/');
    
    // Перевіряємо метадані через viewport
    const favicon = await page.locator('link[rel="icon"]').first();
    const href = await favicon.getAttribute('href');
    
    expect(href).toBeTruthy();
    
    // Перевіряємо, що іконка доступна
    if (href) {
      const response = await page.request.get(href.startsWith('/') ? href : new URL(href, page.url()).pathname);
      expect(response.status()).toBe(200);
    }
  });

  test('should display favicon in browser tab', async ({ page }) => {
    await page.goto('/');
    
    // Перевіряємо, що сторінка завантажилась
    await expect(page).toHaveTitle(/Ірина Красіцька/);
    
    // Перевіряємо наявність favicon через JavaScript
    const faviconExists = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel*="icon"]'));
      return links.length > 0;
    });
    
    expect(faviconExists).toBe(true);
  });
});
