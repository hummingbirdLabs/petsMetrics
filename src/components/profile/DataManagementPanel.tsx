'use client';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useProfile } from '@/hooks/useProfile';

type DataManagementPanelProps = {
  profileId: string;
  onEdit?: () => void;
  className?: string;
};

export function DataManagementPanel({ profileId, onEdit, className = '' }: DataManagementPanelProps) {
  const t = useTranslations('profile.dashboard.data');
  const { exportJSON, importJSON, deleteProfile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await importJSON(file);
    if (!result.ok) {
      alert(result.error.details ?? t('importFailed'));
    }
    // 重置 input 以允许重新选择同一个文件
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = () => {
    if (window.confirm(t('deleteConfirm'))) {
      deleteProfile(profileId);
    }
  };

  return (
    <Card padding="md" className={`flex flex-wrap gap-3 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
        aria-label={t('import')}
      />
      <Button variant="secondary" size="sm" onClick={exportJSON}>
        {t('export')}
      </Button>
      <Button variant="secondary" size="sm" onClick={handleImport}>
        {t('import')}
      </Button>
      {onEdit ? (
        <Button variant="secondary" size="sm" onClick={onEdit}>
          {t('edit')}
        </Button>
      ) : null}
      <Button variant="danger" size="sm" onClick={handleDelete}>
        {t('delete')}
      </Button>
    </Card>
  );
}
