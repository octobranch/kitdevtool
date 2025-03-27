document.addEventListener('DOMContentLoaded', () => {
    // Funciones de utilidad
    const showSection = (sectionId) => {
        const sections = document.querySelectorAll('.tool-section');
        sections.forEach(section => section.style.display = 'none');
        document.getElementById(sectionId).style.display = 'block';
    };

    // Navegación entre secciones
    document.getElementById('readme-generator-btn').addEventListener('click', () => showSection('readme-generator'));
    document.getElementById('tech-docs-btn').addEventListener('click', () => showSection('tech-docs'));
    document.getElementById('docs-validator-btn').addEventListener('click', () => showSection('docs-validator'));
    document.getElementById('changelog-generator-btn').addEventListener('click', () => showSection('changelog-generator'));

    // Generador de README
    document.getElementById('readme-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = document.getElementById('project-name').value;
        const description = document.getElementById('project-description').value;
        const installationSteps = document.getElementById('installation-steps').value;
        const usageExamples = document.getElementById('usage-examples').value;

        const readmeContent = `# ${projectName}

## Descripción
${description}

## Instalación
${installationSteps || 'No se proporcionaron pasos de instalación.'}

## Uso
${usageExamples || 'No se proporcionaron ejemplos de uso.'}

## Contribuciones
Por favor, lee las [pautas de contribución](CONTRIBUTING.md) antes de enviar un pull request.

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.`;

        document.getElementById('readme-output').textContent = readmeContent;
    });

    // Creador de Documentación Técnica
    const parametersContainer = document.getElementById('parameters-container');
    const addParameterBtn = document.getElementById('add-parameter');

    addParameterBtn.addEventListener('click', () => {
        const parameterRow = document.createElement('div');
        parameterRow.classList.add('parameter-row');
        parameterRow.innerHTML = `
            <input type="text" class="param-name" placeholder="Nombre">
            <input type="text" class="param-type" placeholder="Tipo">
            <input type="text" class="param-description" placeholder="Descripción">
            <button type="button" class="remove-param">-</button>
        `;

        // Agregar evento para eliminar parámetro
        parameterRow.querySelector('.remove-param').addEventListener('click', () => {
            parameterRow.remove();
        });

        parametersContainer.appendChild(parameterRow);
    });

    document.getElementById('tech-docs-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const componentName = document.getElementById('component-name').value;
        const techDescription = document.getElementById('tech-description').value;

        // Recopilar parámetros
        const parameterRows = document.querySelectorAll('.parameter-row');
        const parameters = Array.from(parameterRows).map(row => {
            const name = row.querySelector('.param-name').value;
            const type = row.querySelector('.param-type').value;
            const description = row.querySelector('.param-description').value;
            return { name, type, description };
        }).filter(param => param.name); // Filtrar parámetros no vacíos

        let techDocsContent = `# Documentación Técnica: ${componentName}

## Descripción
${techDescription}

## Parámetros
${parameters.length > 0 ? parameters.map(param => `
### ${param.name}
- **Tipo**: ${param.type || 'No especificado'}
- **Descripción**: ${param.description || 'Sin descripción'}
`).join('\n') : 'No se definieron parámetros.'}

## Ejemplo de Uso
\`\`\`javascript
// Ejemplo de uso pendiente de implementación
\`\`\`
`;

        document.getElementById('tech-docs-output').textContent = techDocsContent;
    });

    // Validador de Documentación
    document.getElementById('validator-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const documentationInput = document.getElementById('documentation-input').value;
        const resultsContainer = document.getElementById('validation-results');
        const validationResults = [];

        // Validaciones básicas
        if (document.getElementById('check-grammar').checked) {
            // Simulación de validación gramatical (en un escenario real, usaríamos una API)
            const wordCount = documentationInput.split(/\s+/).length;
            if (wordCount < 10) {
                validationResults.push('⚠️ Advertencia: El texto parece muy corto. Considera expandir la documentación.');
            }
        }

        if (document.getElementById('check-clarity').checked) {
            // Simulación de revisión de claridad
            const complexWords = ['paradigm', 'methodology', 'implementation'];
            const foundComplexWords = complexWords.filter(word => 
                documentationInput.toLowerCase().includes(word.toLowerCase())
            );

            if (foundComplexWords.length > 0) {
                validationResults.push(`⚠️ Sugerencia: Se encontraron palabras complejas que pueden reducir la claridad: ${foundComplexWords.join(', ')}`);
            }
        }

        if (document.getElementById('check-completeness').checked) {
            // Verificación básica de completitud
            const requiredSections = ['descripción', 'instalación', 'uso'];
            const missingSections = requiredSections.filter(section => 
                !documentationInput.toLowerCase().includes(section)
            );

            if (missingSections.length > 0) {
                validationResults.push(`⚠️ Advertencia: Secciones ausentes: ${missingSections.join(', ')}`);
            }
        }

        // Mostrar resultados
        if (validationResults.length === 0) {
            resultsContainer.innerHTML = '<p>✅ Validación completada. No se encontraron problemas significativos.</p>';
        } else {
            resultsContainer.innerHTML = `
                <h3>Resultados de Validación:</h3>
                <ul>
                    ${validationResults.map(result => `<li>${result}</li>`).join('')}
                </ul>
            `;
        }
    });

    // Generador de Changelog
    document.getElementById('changelog-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const version = document.getElementById('version').value;
        const addedFeatures = document.getElementById('added-features').value;
        const fixedIssues = document.getElementById('fixed-issues').value;
        const changes = document.getElementById('changes').value;

        const currentDate = new Date().toISOString().split('T')[0];

        const changelogContent = `## ${version} - ${currentDate}

### Características Agregadas
${addedFeatures || 'No se agregaron nuevas características.'}

### Problemas Corregidos
${fixedIssues || 'No se corrigieron problemas.'}

### Cambios
${changes || 'No se realizaron cambios significativos.'}
`;

        document.getElementById('changelog-output').textContent = changelogContent;
    });

    // Mostrar sección inicial
    showSection('readme-generator');
});
