export const snippetsData = {
  webhook: {
    filename: 'webhook_receiver.py',
    language: 'Python',
    description: 'Constant-time cryptographic signature verification for GitHub App webhooks, preventing timing side-channel attacks.',
    code: `import hashlib
import hmac
import os
from flask import Flask, abort, request

app = Flask(__name__)

def verify_signature(payload_body: bytes, signature_header: str | None) -> bool:
    """
    Validates GitHub App webhook HMAC-SHA256 signature header.
    Uses hmac.compare_digest for constant-time comparison to prevent timing attacks.
    """
    if not signature_header:
        return False
        
    webhook_secret = os.environ.get("GITHUB_WEBHOOK_SECRET", "").encode()
    if not webhook_secret:
        return False
        
    expected = "sha256=" + hmac.new(webhook_secret, payload_body, hashlib.sha256).hexdigest()
    
    # Constant-time compare -- avoids timing leaks
    return hmac.compare_digest(expected, signature_header)

@app.route("/api/v1/github-webhook", methods=["POST"])
def handle_webhook():
    signature = request.headers.get("X-Hub-Signature-256")
    if not verify_signature(request.data, signature):
        abort(401, description="Invalid cryptographic webhook signature.")
        
    event_type = request.headers.get("X-GitHub-Event", "ping")
    payload = request.get_json(force=True)
    
    # Dispatch autonomous agent sandbox pipeline
    if event_type == "issues" and payload.get("action") == "opened":
        dispatch_resilient_sandbox(payload["issue"])
        
    return {"status": "dispatched", "event": event_type}, 200`
  },

  ml: {
    filename: 'used_bike_model.py',
    language: 'Python',
    description: 'RandomForestRegressor machine learning training pipeline with categorical feature encoding and evaluation metrics.',
    code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Load vehicle transaction dataset
df = pd.read_csv("used_bikes_delhi_ncr.csv")

# Feature selection & target vector
X = df[["kms_driven", "age_years", "power_bhp", "brand_code"]]
y = df["price_inr"]

# Preprocessing: categorical encoding for brand codes
preprocessor = ColumnTransformer(
    transformers=[
        ("brand_enc", OneHotEncoder(handle_unknown="ignore"), ["brand_code"])
    ],
    remainder="passthrough"
)

# Ensemble Regressor Pipeline
model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(
        n_estimators=150,
        max_depth=14,
        min_samples_split=4,
        random_state=42,
        n_jobs=-1
    ))
])

# Split & Train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)

print(f"✅ Model Fitted Successfully | R² Score: {r2:.4f} | MAE: ₹{mae:,.2f}")`
  },

  yggdrasil: {
    filename: 'yggdrasil_tree_agent.py',
    language: 'Python',
    description: 'Yggdrasil multi-branch reasoning tree decomposition agent with async event loop and structured thought chains.',
    code: `import asyncio
from typing import List, Dict, Any
from pydantic import BaseModel

class ThoughtBranch(BaseModel):
    branch_id: str
    hypothesis: str
    confidence_score: float
    sub_tasks: List[str]

class YggdrasilTreeEngine:
    def __init__(self, model_name: str = "gpt-4o-mini", max_depth: int = 4):
        self.model = model_name
        self.max_depth = max_depth
        self.memory_graph: Dict[str, Any] = {}

    async def decompose_query(self, user_prompt: str) -> List[ThoughtBranch]:
        """
        Decomposes complex requests into parallel executable thought branches.
        """
        system_prompt = (
            "You are Yggdrasil Neural Tree Agent. "
            "Decompose the incoming query into structured root and leaf tasks."
        )
        # Simulate async LLM branch generation
        await asyncio.sleep(0.05)
        
        branches = [
            ThoughtBranch(
                branch_id="root-01",
                hypothesis=f"Decomposing intent for: {user_prompt[:30]}...",
                confidence_score=0.96,
                sub_tasks=["Syntax validation", "Context vector retrieval", "Execution synthesis"]
            )
        ]
        return branches

    async def execute_branches(self, branches: List[ThoughtBranch]) -> Dict[str, Any]:
        tasks = [self._execute_single_branch(b) for b in branches]
        results = await asyncio.gather(*tasks)
        return {"tree_status": "CONVERGED", "nodes_evaluated": len(results)}

    async def _execute_single_branch(self, branch: ThoughtBranch):
        return f"Branch {branch.branch_id} verified with score {branch.confidence_score}"`
  },

  schema: {
    filename: 'schema.sql',
    language: 'SQL',
    description: 'Relational database schema for the Resilient issue discovery queue and agent test matrices.',
    code: `-- Resilient Autonomous Benchmark Database Schema
CREATE TABLE IF NOT EXISTS repos (
    id SERIAL PRIMARY KEY,
    owner_repo VARCHAR(255) NOT NULL UNIQUE,
    language VARCHAR(50) NOT NULL,
    stars INT DEFAULT 0,
    test_framework VARCHAR(50) DEFAULT 'pytest',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,
    repo_id INTEGER NOT NULL REFERENCES repos(id) ON DELETE CASCADE,
    issue_number INT NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    reproducible_test_path TEXT,
    status VARCHAR(50) DEFAULT 'QUEUED', -- QUEUED, RUNNING, SOLVED, FAILED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(repo_id, issue_number)
);

CREATE TABLE IF NOT EXISTS agent_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    issue_id INTEGER REFERENCES issues(id) ON DELETE CASCADE,
    model_name VARCHAR(100) NOT NULL,
    git_patch_diff TEXT,
    tests_passed BOOLEAN DEFAULT FALSE,
    execution_time_seconds NUMERIC(8,2),
    tokens_consumed INT,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status);
CREATE INDEX IF NOT EXISTS idx_agent_runs_model ON agent_runs(model_name);`
  }
};
