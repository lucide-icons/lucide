package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Verified: ImageVector
    get() {
        if (_verified != null) {
            return _verified!!
        }
        _verified = Builder(name = "Verified", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 3.0f)
                curveToRelative(-1.2f, 0.0f, -2.4f, 0.6f, -3.0f, 1.7f)
                arcTo(3.6f, 3.6f, 0.0f, false, false, 4.6f, 9.0f)
                curveToRelative(-1.0f, 0.6f, -1.7f, 1.8f, -1.7f, 3.0f)
                reflectiveCurveToRelative(0.7f, 2.4f, 1.7f, 3.0f)
                curveToRelative(-0.3f, 1.2f, 0.0f, 2.5f, 1.0f, 3.4f)
                curveToRelative(0.8f, 0.8f, 2.1f, 1.2f, 3.3f, 1.0f)
                curveToRelative(0.6f, 1.0f, 1.8f, 1.6f, 3.0f, 1.6f)
                reflectiveCurveToRelative(2.4f, -0.6f, 3.0f, -1.7f)
                curveToRelative(1.2f, 0.3f, 2.5f, 0.0f, 3.4f, -1.0f)
                curveToRelative(0.8f, -0.8f, 1.2f, -2.0f, 1.0f, -3.3f)
                curveToRelative(1.0f, -0.6f, 1.6f, -1.8f, 1.6f, -3.0f)
                reflectiveCurveToRelative(-0.6f, -2.4f, -1.7f, -3.0f)
                curveToRelative(0.3f, -1.2f, 0.0f, -2.5f, -1.0f, -3.4f)
                arcToRelative(3.7f, 3.7f, 0.0f, false, false, -3.3f, -1.0f)
                curveToRelative(-0.6f, -1.0f, -1.8f, -1.6f, -3.0f, -1.6f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(9.0f, 12.0f)
                lineToRelative(2.0f, 2.0f)
                lineToRelative(4.0f, -4.0f)
            }
        }
        .build()
        return _verified!!
    }

private var _verified: ImageVector? = null
