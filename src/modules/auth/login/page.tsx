import { useMemo, type FormEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@modules/core/ui/primitives/button';
import { FormError } from '@modules/core/ui/primitives/form-error';
import { Input } from '@modules/core/ui/primitives/input';
import { useAuthStore } from '../provider/store';
import { LoginStore } from './store';

export default observer(function LoginPage() {
    const navigate = useNavigate();
    const authStore = useAuthStore();
    const loginStore = useMemo(
        () => new LoginStore({ repo: null as never, authStore }),
        [authStore],
    );

    if (authStore.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await loginStore.submit();
        if (authStore.isAuthenticated) {
            navigate('/');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-[var(--color-surface-canvas)]">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] p-6">
                <h1 className="text-lg font-semibold text-[var(--color-text-strong)]">Login</h1>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-text-body)]">Username</label>
                    <Input value={loginStore.username} onValueChange={loginStore.setUsername} placeholder="Enter username" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-text-body)]">Password</label>
                    <Input type="password" value={loginStore.password} onValueChange={loginStore.setPassword} placeholder="Enter password" />
                </div>
                {loginStore.error && <FormError message={loginStore.error} />}
                <Button type="submit" className="w-full" disabled={!loginStore.isSubmittable || loginStore.submitting}>
                    {loginStore.submitting ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </div>
    );
});
