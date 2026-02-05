/**
 * Patches.json Validation Script
 * Run this script to validate the structure and content of patches.json
 * 
 * Usage: node scripts/validatePatches.js
 * Or include in HTML during development for runtime validation
 */

(function() {
  'use strict';
  
  /**
   * Validates the patches.json data structure
   * @param {Object} patchData - The loaded patches data
   * @returns {Object} Validation result with errors and warnings
   */
  function validatePatchData(patchData) {
    const errors = [];
    const warnings = [];
    const logger = window.Logger ? new Logger('Validator') : console;
    
    // Check if balance array exists
    if (!patchData || typeof patchData !== 'object') {
      errors.push('Patches data is not an object');
      return { valid: false, errors, warnings };
    }
    
    if (!patchData.balance) {
      errors.push('Missing "balance" array in patches data');
      return { valid: false, errors, warnings };
    }
    
    if (!Array.isArray(patchData.balance)) {
      errors.push('"balance" is not an array');
      return { valid: false, errors, warnings };
    }
    
    // Validate each patch entry
    const patchNumbers = new Set();
    const currentDate = new Date();
    
    patchData.balance.forEach((patch, index) => {
      const context = `Patch at index ${index}`;
      
      // Required fields
      if (!patch.patch) {
        errors.push(`${context}: Missing "patch" number`);
      } else if (typeof patch.patch !== 'string') {
        errors.push(`${context}: "patch" should be a string`);
      } else if (patchNumbers.has(patch.patch)) {
        errors.push(`${context}: Duplicate patch number "${patch.patch}"`);
      } else {
        patchNumbers.add(patch.patch);
      }
      
      if (!patch.link) {
        errors.push(`${context}: Missing "link" field`);
      } else if (typeof patch.link !== 'string') {
        errors.push(`${context}: "link" should be a string`);
      } else {
        // Validate link format
        if (!patch.link.startsWith('pages/')) {
          warnings.push(`${context}: Link doesn't start with "pages/" - "${patch.link}"`);
        }
        if (!patch.link.endsWith('.html')) {
          warnings.push(`${context}: Link doesn't end with ".html" - "${patch.link}"`);
        }
      }
      
      if (!patch.date) {
        errors.push(`${context}: Missing "date" field`);
      } else if (typeof patch.date !== 'string') {
        errors.push(`${context}: "date" should be a string`);
      } else {
        // Validate date format (should be "Month DD, YYYY")
        const datePattern = /^[A-Z][a-z]+ \d{1,2}, \d{4}$/;
        if (!datePattern.test(patch.date)) {
          errors.push(`${context}: Invalid date format "${patch.date}". Expected "Month DD, YYYY"`);
        } else {
          // Parse and validate date
          const parsedDate = new Date(patch.date);
          if (isNaN(parsedDate.getTime())) {
            errors.push(`${context}: Invalid date "${patch.date}"`);
          } else if (parsedDate > currentDate) {
            warnings.push(`${context}: Future date detected "${patch.date}"`);
          }
        }
      }
      
      // Check for extra fields (not an error, but good to know)
      const validFields = ['patch', 'link', 'date'];
      const extraFields = Object.keys(patch).filter(key => !validFields.includes(key));
      if (extraFields.length > 0) {
        warnings.push(`${context}: Extra fields detected - ${extraFields.join(', ')}`);
      }
    });
    
    // Validate sorting (patches should be in descending order by number)
    const patchNumbersArray = patchData.balance
      .map(p => parseInt(p.patch, 10))
      .filter(n => !isNaN(n));
    
    for (let i = 0; i < patchNumbersArray.length - 1; i++) {
      if (patchNumbersArray[i] < patchNumbersArray[i + 1]) {
        warnings.push(`Patches may not be sorted correctly: ${patchNumbersArray[i]} comes before ${patchNumbersArray[i + 1]}`);
        break;
      }
    }
    
    // Summary
    const valid = errors.length === 0;
    const summary = {
      valid,
      errors,
      warnings,
      totalPatches: patchData.balance.length,
      uniquePatches: patchNumbers.size
    };
    
    // Log results
    if (valid) {
      logger.info?.('✅ Patches data validation passed');
      logger.info?.(`Total patches: ${summary.totalPatches}`);
      if (warnings.length > 0) {
        logger.warn?.(`⚠️ ${warnings.length} warning(s) found`);
        warnings.forEach(w => logger.warn?.(w));
      }
    } else {
      logger.error?.('❌ Patches data validation failed');
      logger.error?.(`${errors.length} error(s) found`);
      errors.forEach(e => logger.error?.(e));
    }
    
    return summary;
  }
  
  /**
   * Load and validate patches.json
   * @async
   * @returns {Promise<Object>} Validation results
   */
  async function validatePatchesFromFile() {
    try {
      const response = await fetch('./assets/data/patches.json');
      if (!response.ok) {
        throw new Error(`Failed to load patches.json: ${response.statusText}`);
      }
      
      const data = await response.json();
      return validatePatchData(data);
    } catch (error) {
      console.error('Failed to validate patches:', error);
      return {
        valid: false,
        errors: [error.message],
        warnings: [],
        totalPatches: 0,
        uniquePatches: 0
      };
    }
  }
  
  /**
   * Generate a detailed validation report
   * @param {Object} validationResult - Result from validatePatchData
   * @returns {string} Formatted report
   */
  function generateReport(validationResult) {
    const { valid, errors, warnings, totalPatches, uniquePatches } = validationResult;
    
    let report = '=== Patches.json Validation Report ===\n\n';
    report += `Status: ${valid ? '✅ PASSED' : '❌ FAILED'}\n`;
    report += `Total Patches: ${totalPatches}\n`;
    report += `Unique Patches: ${uniquePatches}\n`;
    report += `Errors: ${errors.length}\n`;
    report += `Warnings: ${warnings.length}\n\n`;
    
    if (errors.length > 0) {
      report += '--- Errors ---\n';
      errors.forEach((error, i) => {
        report += `${i + 1}. ${error}\n`;
      });
      report += '\n';
    }
    
    if (warnings.length > 0) {
      report += '--- Warnings ---\n';
      warnings.forEach((warning, i) => {
        report += `${i + 1}. ${warning}\n`;
      });
      report += '\n';
    }
    
    report += '=======================================';
    return report;
  }
  
  // Export for use in browser or Node.js
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
      validatePatchData,
      validatePatchesFromFile,
      generateReport
    };
  } else {
    // Browser environment
    window.PatchValidator = {
      validate: validatePatchData,
      validateFromFile: validatePatchesFromFile,
      generateReport
    };
    
    // Auto-validate in development mode
    if (window.location.search.includes('validate=true')) {
      document.addEventListener('DOMContentLoaded', async () => {
        console.log('🔍 Running automatic patch validation...');
        const result = await validatePatchesFromFile();
        console.log(generateReport(result));
      });
    }
  }
  
})();
