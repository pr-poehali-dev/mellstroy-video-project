import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API for managing win videos (CRUD operations)
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with request_id, function_name attributes
    Returns: HTTP response dict with videos data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            video_id = event.get('queryStringParameters', {}).get('id')
            
            if video_id:
                cursor.execute(
                    "SELECT id, title, video_url, thumbnail_url, amount, views, created_at, updated_at FROM videos WHERE id = " + str(int(video_id))
                )
                video = cursor.fetchone()
                if not video:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Video not found'}),
                        'isBase64Encoded': False
                    }
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(video), default=str),
                    'isBase64Encoded': False
                }
            else:
                cursor.execute(
                    "SELECT id, title, video_url, thumbnail_url, amount, views, created_at, updated_at FROM videos ORDER BY created_at DESC"
                )
                videos = cursor.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([dict(v) for v in videos], default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            title = body_data.get('title', '').replace("'", "''")
            video_url = body_data.get('video_url', '').replace("'", "''")
            thumbnail_url = body_data.get('thumbnail_url', '').replace("'", "''")
            amount = body_data.get('amount', '').replace("'", "''")
            views = body_data.get('views', '0').replace("'", "''")
            
            cursor.execute(
                f"INSERT INTO videos (title, video_url, thumbnail_url, amount, views) VALUES ('{title}', '{video_url}', '{thumbnail_url}', '{amount}', '{views}') RETURNING id, title, video_url, thumbnail_url, amount, views, created_at, updated_at"
            )
            new_video = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(new_video), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            video_id = body_data.get('id')
            if not video_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Video ID required'}),
                    'isBase64Encoded': False
                }
            
            title = body_data.get('title', '').replace("'", "''")
            video_url = body_data.get('video_url', '').replace("'", "''")
            thumbnail_url = body_data.get('thumbnail_url', '').replace("'", "''")
            amount = body_data.get('amount', '').replace("'", "''")
            views = body_data.get('views', '').replace("'", "''")
            
            cursor.execute(
                f"UPDATE videos SET title = '{title}', video_url = '{video_url}', thumbnail_url = '{thumbnail_url}', amount = '{amount}', views = '{views}', updated_at = CURRENT_TIMESTAMP WHERE id = {int(video_id)} RETURNING id, title, video_url, thumbnail_url, amount, views, created_at, updated_at"
            )
            updated_video = cursor.fetchone()
            conn.commit()
            
            if not updated_video:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Video not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(updated_video), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            body_data = json.loads(event.get('body', '{}'))
            video_id = body_data.get('id')
            if not video_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Video ID required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(f"DELETE FROM videos WHERE id = {int(video_id)} RETURNING id")
            deleted = cursor.fetchone()
            conn.commit()
            
            if not deleted:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Video not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'id': deleted['id']}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
