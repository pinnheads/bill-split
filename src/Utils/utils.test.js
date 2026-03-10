import { describe, it, expect, vi } from 'vitest';
import { newId } from './utils';

describe('utils', () => {
    describe('newId', () => {
        it('should return a randomUUID if available', () => {
            const mockUUID = 'test-uuid';
            vi.stubGlobal('crypto', {
                randomUUID: vi.fn().mockReturnValue(mockUUID)
            });

            expect(newId()).toBe(mockUUID);
        });

        it('should return a timestamp string if randomUUID is not available', () => {
            vi.stubGlobal('crypto', undefined);
            const now = 123456789;
            vi.useFakeTimers();
            vi.setSystemTime(now);

            expect(newId()).toBe(String(now));
            
            vi.useRealTimers();
        });
    });
});
