import React, { useState, useEffect } from 'react';
import BucketCard from '../../components/bucketlist/BucketCard.jsx';
import AutoApplyButton from '../../components/applications/AutoApplyButton.jsx';

export default function BucketList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    import('../../services/application.service.js').then(({ applicationService }) => {
      applicationService.getBucketList().then(res => {
        if (mounted) {
          setItems(res?.jobs || []);
          setLoading(false);
        }
      });
    });
    return () => { mounted = false; };
  }, []);

  const handleRemove = async (id) => {
    const { applicationService } = await import('../../services/application.service.js');
    await applicationService.removeFromBucket(id);
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex justify-between items-center bg-[#151A24] p-4 rounded-xl border border-[#1E2533]">
        <div>
          <h2 className="text-lg font-black text-white">Bucket List ({items.length})</h2>
          <p className="text-xs text-[#8A99AF]">Jobs bookmarked for custom resume tailoring or deferred application.</p>
        </div>
        <AutoApplyButton jobIds={items.map(i => i.id)} priorityLevel="Priority 1" />
      </div>
      {items.length === 0 ? (
        <div className="card-panel py-12 text-center text-xs text-[#8A99AF]">
          Your bucket list is empty. Bookmark jobs during discovery to save them here!
        </div>
      ) : (
        items.map(item => (
          <BucketCard key={item.id} job={item} onRemove={handleRemove} />
        ))
      )}
    </div>
  );
}
