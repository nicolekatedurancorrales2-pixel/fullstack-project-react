import { test, expect } from '@playwright/test'

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  // 1. Interceptar la API de tareas para simular respuestas (Mocking)
  await page.route('**/tasks', async (route) => {
    const method = route.request().method()
    
    // Si la App solicita GET /tasks al cargar, devolvemos un array vacío inicial
    if (method === 'GET') {
      await route.fulfill({ status: 200, json: [] })
    } 
    // Si la App envía un POST para crear tarea
    else if (method === 'POST') {
      const postData = JSON.parse(route.request().postData() || '{}')
      await route.fulfill({
        status: 201,
        json: { id: Date.now(), text: postData.text, completed: false },
      })
    } else {
      await route.continue()
    }
  })

  // 2. Entrar a la aplicación
  await page.goto('/')

  // 3. Escribir en el campo de texto (buscamos por el rol 'textbox')
  const input = page.getByRole('textbox')
  await input.fill('Comprar pan')

  // 4. Hacer clic en el botón con texto "Agregar"
  await page.getByRole('button', { name: /agregar/i }).click()

  // 5. Verificar que la tarea 'Comprar pan' es visible en pantalla
  await expect(page.getByText('Comprar pan')).toBeVisible()
})