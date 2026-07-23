"""Analytics and Notifications API routes."""
from fastapi import APIRouter
from fastapi.responses import StreamingResponse, JSONResponse
import io
import base64

try:
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    MATPLOTLIB_INSTALLED = True
except ImportError:
    MATPLOTLIB_INSTALLED = False

from backend.services.analytics_service import analytics_service
from backend.services.notification_service import notification_service

router = APIRouter()

@router.get("/overview")
async def get_dashboard_overview():
    return analytics_service.get_overview()

@router.get("/notifications")
async def get_notifications():
    return notification_service.get_notifications()

@router.get("/pie-chart")
async def get_pie_chart():
    if not MATPLOTLIB_INSTALLED:
        # Return a transparent 1x1 PNG if matplotlib is not installed to avoid broken image icons
        img_data = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=")
        return StreamingResponse(io.BytesIO(img_data), media_type="image/png")
        
    # Define platforms and distribution
    labels = ['LinkedIn', 'Indeed', 'Naukri', 'Wellfound', 'Glassdoor']
    sizes = [45, 20, 15, 12, 8]
    colors = ['#0a66c2', '#2164f4', '#ff7555', '#e33e38', '#0caa41']
    explode = (0.05, 0, 0, 0, 0)
    
    # Create the pie chart
    fig, ax = plt.subplots(figsize=(6, 4))
    fig.patch.set_facecolor('#ffffff') # Match light theme background
    ax.set_facecolor('#ffffff')
    
    wedges, texts, autotexts = ax.pie(
        sizes, 
        explode=explode, 
        labels=labels, 
        colors=colors,
        autopct='%1.1f%%',
        shadow=False, 
        startangle=140,
        textprops={'color': '#111827', 'fontsize': 10, 'weight': 'bold'}
    )
    
    # Make autopct texts white for better contrast inside slices
    for autotext in autotexts:
        autotext.set_color('white')
        autotext.set_fontsize(9)
        autotext.set_weight('bold')
        
    ax.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
    plt.tight_layout()
    
    # Save chart to a bytes buffer
    buf = io.BytesIO()
    plt.savefig(buf, format='png', dpi=100, bbox_inches='tight', transparent=True)
    plt.close(fig)
    buf.seek(0)
    
    return StreamingResponse(buf, media_type="image/png")
